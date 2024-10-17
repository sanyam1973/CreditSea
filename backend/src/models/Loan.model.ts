import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Loan data
interface ILoan extends Document {
  idNumber: number;
  fullName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  status: string;
  loanOfficer?: string;  // Optional field
}

// Create the Loan schema
const LoanSchema: Schema = new Schema({
  idNumber: {
    type: Schema.Types.Number,
    required: true,
  },
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  loanAmount: {
    type: Schema.Types.Number,
    required: true,
  },
  loanTenure: {
    type: Schema.Types.Number,
    required: true,
  },
  employmentStatus: {
    type: Schema.Types.String,
    required: true,
  },
  reasonForLoan: {
    type: Schema.Types.String,
    required: true,
  },
  employmentAddress: {
    type: Schema.Types.String,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
  },
  loanOfficer: {
    type: Schema.Types.String,
    required: false,  // Marked as optional
  }
}, { 
  timestamps: true,  // Enable createdAt and updatedAt
  versionKey: false  // Disable __v field
});

// Create and export the Loan model
export const Loan = mongoose.model<ILoan>('Loan', LoanSchema);
