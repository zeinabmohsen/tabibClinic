const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

const roles = ["secretary", "doctor", "admin"];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    firstName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    avatar: {
      type: String,
      trim: true,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorSchedule",
    },
    specialty: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    feeRatio: {
      type: Number,
      min: 0,
      default: 0,
    },
    services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
    },
    assignedPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    referringPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "_id",
      "firstName",
      "lastName",
      "email",
      "phone",
      "role",
      "avatar",
      "color",
      "schedule",
      "specialty",
      "feeRatio",
      "services",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
userSchema.statics = {
  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).populate("schedule services").exec();
      }
      if (user) {
        return user;
      }

      throw new Error({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    try {
      const { email, password, refreshObject } = options;
      if (!email) throw new Error("An email is required to generate a token");

      const user = await this.findOne({ email }).exec();
      const err = {
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
      };
      if (password) {
        if (user && (await user.passwordMatches(password))) {
          return { user, accessToken: user.token() };
        }
        err.message = "Incorrect email or password";
      } else if (refreshObject && refreshObject.userEmail === email) {
        return { user, accessToken: user.token() };
      } else {
        err.message = "Incorrect email or refreshToken";
      }
      throw err;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);
module.exports = User;
