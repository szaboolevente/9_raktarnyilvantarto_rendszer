export function validProductRequestBody(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({message: "Invalid name input!"});
    }

    if(!req.body.parts || !req.body.requiredProducts) {
        return res.status(400).json({message: "Invalid part or product input!"});
    }

    if(req.body.parts.length < 1 && req.body.requiredProducts.length < 1) {
        return res.status(400).json({message: "Invalid part or product input!"});
    }

    next();
}