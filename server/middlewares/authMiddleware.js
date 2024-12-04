
const validateSchema = (Schema) =>async (req,res,next)=>{
try {
    const data = req.body;
    const parseBody = await Schema.parseAsync(data);
    req.body = parseBody;
    next()
} catch (err) {
    const message = err.errors[0].message;
    const error = {
        status:401,
        message:message,
        errorInfo:"Fill the details properly !"
    }
    next(error);
    // res.status(400).json({message:message});
}
}
module.exports = validateSchema ;