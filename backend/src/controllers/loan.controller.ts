import { Request, Response, NextFunction } from 'express';
import { Loan } from '../models/Loan.model';

// Reusable error handler
const errorHandler = (res: Response, statusCode: number, message: string, details?: string) => {
  res.status(statusCode).json({ error: message, details });
};

// Async wrapper for route handlers to catch async errors
const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


export const createLoan = asyncWrapper(async (req: Request, res: Response) => {
  const { fullName, loanAmount, loanTenure, employmentStatus, reasonForLoan, employmentAddress } = req.body;
  const idNumber = req.query.idNumber;
  const status = "PENDING";
  const loanOfficer = "Not Assigned";
 

  if (!idNumber) {
    return errorHandler(res, 400, 'IdNumber is required.');
  }

  try {
    const newLoan = new Loan({ idNumber, fullName, loanAmount, loanTenure, employmentStatus, reasonForLoan, employmentAddress, status, loanOfficer });
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    errorHandler(res, 500, 'Error creating loan entry', (error as Error).message);
  }
});

export const getLoansByRole = asyncWrapper(async (req: Request, res: Response) => {
  const { role } = req.query;

  try {
    let loans;

    if (role === 'verifier') {
      loans = await Loan.find({ status: { $in: ['PENDING', 'VERIFIED'] } });
    } else if (role === 'admin') {
      loans = await Loan.find({ status: { $in: ['VERIFIED', 'APPROVED', 'REJECTED'] } });
    } else {
      return errorHandler(res, 400, 'Invalid role. Please specify either "verifier" or "admin".');
    }
    
    res.status(200).json(loans);
  } catch (error) {
    errorHandler(res, 500, 'Error fetching loan entries', (error as Error).message);
  }
});

export const getLoansByIdNumber = asyncWrapper(async (req: Request, res: Response) => {
  const { idNumber } = req.query;

  if (!idNumber || isNaN(Number(idNumber))) {
    return errorHandler(res, 400, 'Invalid idNumber provided. It should be a number.');
  }

  try {
    const loans = await Loan.find({ idNumber: Number(idNumber) });

    if (loans.length === 0) {
      return errorHandler(res, 404, 'No loans found for this idNumber.');
    }

    res.status(200).json(loans);
  } catch (error) {
    errorHandler(res, 500, 'Error fetching loans by idNumber', (error as Error).message);
  }
});

export const updateLoanStatusAdmin = asyncWrapper(async (req: Request, res: Response) => {
    const { _id } = req.query; 
    const { status } = req.body;
  
    if (!status) {
      return errorHandler(res, 400, 'Status is required to update the loan.');
    }
  
    const updatedLoan = await Loan.findByIdAndUpdate(
      _id,
      { status },
      { new: true, runValidators: true }
    );
  
    if (!updatedLoan) {
      return errorHandler(res, 404, 'Loan not found.');
    }
  
    res.status(200).json(updatedLoan);
  });
  

export const updateLoanStatusVerifier = asyncWrapper(async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { status, loanOfficer } = req.body;

  if (!status) {
    return errorHandler(res, 400, 'Status is required to update the loan.');
  }
  if (!loanOfficer) {
    return errorHandler(res, 400, 'loanOfficer is required to update the loan.');
  }

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      _id,
      { status, loanOfficer },
      { new: true, runValidators: true }
    );

    if (!updatedLoan) {
      return errorHandler(res, 404, 'Loan not found.');
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    errorHandler(res, 500, 'Error updating loan status', (error as Error).message);
  }
});

export const getLoanSummary = asyncWrapper(async (req: Request, res: Response) => {
    const [distinctActiveUsers, distinctBorrowUsers, approvedLoanCount, totalDisbursed] = await Promise.all([
      Loan.aggregate([{ $group: { _id: "$idNumber" } }]),
      Loan.aggregate([{ $match: { status: { $ne: 'PENDING' } } }, { $group: { _id: "$idNumber" } }]),
      Loan.countDocuments({ status: 'APPROVED' }),
      Loan.aggregate([{ $match: { status: 'APPROVED' } }, { $group: { _id: null, totalDisbursedloanAmount: { $sum: "$loanAmount" } } }])
    ]);
  
    const totalDisbursedloanAmount = totalDisbursed.length > 0 ? totalDisbursed[0].totalDisbursedloanAmount : 0;
  
    res.status(200).json([{
      activeUserCount: distinctActiveUsers.length,
      borrowUserCount: distinctBorrowUsers.length,
      approvedLoanCount,
      totalDisbursedloanAmount
    }]);
  });