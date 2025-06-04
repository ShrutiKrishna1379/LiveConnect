import moogoose from 'mongoose'
const messageSchema = new moogoose.Schema({
    sender:{ 
        type: moogoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true 
    },
    receiver:{ 
        type: moogoose.Schema.Types.ObjectId, 
        ref:'User', 
        required:true 
    },
    message:{ 
        type:String, 
        default:"" 
    },
    image:{ 
        type:String, 
        default:"" 
    },

},{timestamps:true})   

const Message = moogoose.model('Message', messageSchema)
export default Message