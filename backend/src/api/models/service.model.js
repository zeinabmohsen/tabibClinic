const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "_id",
      "name",
      "price",
      "doctor",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

serviceSchema.statics = {
  async get(id) {
    try {
      const service = await this.findById(id).exec();
      if (!service) {
        throw new APIError({
          message: "Service does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }
      return service;
    } catch (error) {
      throw error;
    }
  },

  list({ page = 1, perPage = 30, name, price, doctor }) {
    const options = omitBy({ name, price, doctor }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  async createService(name, price, doctor) {
    try {
      const service = await this.create({ name, price, doctor });
      return service;
    } catch (error) {
      throw error;
    }
  },

  async updateService(serviceId, name, price, doctorId) {
    try {
      const service = await this.findById(serviceId).exec();
      if (!service) {
        throw new APIError({
          message: "Service does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }

      if (service.doctor.toString() !== doctorId.toString()) {
        throw new APIError({
          message: "You are not authorized to update this service",
          status: httpStatus.UNAUTHORIZED,
        });
      }

      service.name = name;
      service.price = price;

      return service.save();
    } catch (error) {
      throw error;
    }
  },

  async deleteService(serviceId, doctorId) {
    try {
      const service = await this.findById(serviceId).exec();
      if (!service) {
        throw new APIError({
          message: "Service does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }

      if (service.doctor.toString() !== doctorId.toString()) {
        throw new APIError({
          message: "You are not authorized to delete this service",
          status: httpStatus.UNAUTHORIZED,
        });
      }

      await this.deleteOne({ _id: serviceId }).exec();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model("Service", serviceSchema);
