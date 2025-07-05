// displays general error

import { errorFilePath } from "#utils/path.util";

const errorController = (req, res)=>{
   res.sendFile(errorFilePath);
}

export default errorController;