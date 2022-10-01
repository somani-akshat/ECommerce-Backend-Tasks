const asyncHandler = require("express-async-handler");
const EMI = require("../models/emiModel");

// Create EMI - Only for Admin
const addEMI = asyncHandler(async (req, res) => {
  try {
    const {
      user,
      userName,
      loan,
      loanName,
      agentAssigned,
      agent,
      agentName,
      order,
      emiInstallmentNumber,
      inPTP,
      amount,
      isPaid,
      paidAt,
      lastDate,
      paymentStatus,
    } = req.body;

    // console.log(itemsPrice);
    const emi = new EMI({
      user,
      userName,
      loan,
      loanName,
      agentAssigned,
      agent,
      agentName,
      order,
      emiInstallmentNumber,
      inPTP,
      amount,
      isPaid,
      paidAt,
      lastDate,
      paymentStatus,
    });

    const createEMI = await emi.save();

    res.status(201).json({
      _id: createEMI._id,
      user: createEMI.user,
      userName: createEMI.userName,
      loan: createEMI.loan,
      loanName: createEMI.loanName,
      agentAssigned: createEMI.agentAssigned,
      agent: createEMI.agent,
      agentName: createEMI.agentName,
      order: createEMI.order,
      emiInstallmentNumber: createEMI.emiInstallmentNumber,
      inPTP: createEMI.inPTP,
      amount: createEMI.amount,
      isPaid: createEMI.isPaid,
      paidAt: createEMI.paidAt,
      lastDate: createEMI.lastDate,
      paymentStatus: createEMI.paymentStatus,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      data: error,
    });
  }
});

// Agent - Update EMI status to pending after sending payment link
const updateEMIToPending = asyncHandler(async (req, res) => {
  const emi = await EMI.findById(req.params.id);
  if (emi) {
    emi.paymentStatus = "pending";
    const updatedEmi = await emi.save();
    res.status(200).json({
      success: true,
      data: updatedEmi,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "No EMI found",
    });
  }
});

// Agent - Add EMI to PTP
const addEMIToPTP = asyncHandler(async (req, res) => {
  const emi = await EMI.findById(req.params.id);
  if (emi) {
    emi.inPTP = true;
    const updatedEmi = await emi.save();
    res.status(200).json({
      success: true,
      data: updatedEmi,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "No EMI found",
    });
  }
});

module.exports = {
  addEMI,
  updateEMIToPending,
  addEMIToPTP,
};