import { validDate } from './validators';

export function validPartRequestBody(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({message: "Invalid name input!"});
    }

    if(!req.body.receiptDate ||
       !validDate(req.body.receiptDate)) {
        return res.status(400).json({message: "Invalid date input!"});
    }

    if(req.body.amount < 0) {
        return res.status(400).json({message: "Invalid amount input!"});
    }

    next();
}