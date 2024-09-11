const ErrorUtils = module.exports; 

ErrorUtils.APIErrorResponse = (res, error) =>{
    if(!error){
        return res.status(500).json({message: "Something went wrong check your Http request"})
    }
    return res.status(error.ststus_code || 500 ).json(error)
}