const httpStatus = require("http-status");
const User = require("../models/user.model");

exports.createSecretary = async (req, res, next) => {
  try {
    const secretaryData = req.body;
    secretaryData.role = "secretary"; 
    
    const secretary = await User.create(secretaryData);
    
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Secretary created successfully",
      secretary: secretary.transform()
    });
  } catch (error) {
    next(error);
  }
};

exports.getSecretaryById = async (req, res, next) => {
  try {
    const secretaryId = req.params.id;
    const secretary = await User.get(secretaryId);
    
    res.status(httpStatus.OK).json({
      success: true,
      secretary: secretary.transform()
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSecretary = async (req, res, next) => {
  try {
    const secretaryId = req.params.id;
    const updateData = req.body;
    
    const secretary = await User.findByIdAndUpdate(secretaryId, updateData, { new: true });
    
    if (!secretary) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Secretary not found"
      });
    }
    
    res.status(httpStatus.OK).json({
      success: true,
      message: "Secretary updated successfully",
      secretary: secretary.transform()
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSecretary = async (req, res, next) => {
  try {
    const secretaryId = req.params.id;
    
    const secretary = await User.findByIdAndDelete(secretaryId);
    
    if (!secretary) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Secretary not found"
      });
    }
    
    res.status(httpStatus.OK).json({
      success: true,
      message: "Secretary deleted successfully",
      secretary: secretary.transform()
    });
  } catch (error) {
    next(error);
  }
};
