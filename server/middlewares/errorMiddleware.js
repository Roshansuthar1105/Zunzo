const errorMiddleware = (err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "backend error"
    const errorInfo = err.errorInfo || "Some error occured at backend side !"
    return res.status(status).json({message,errorInfo});
}
module.exports = errorMiddleware;