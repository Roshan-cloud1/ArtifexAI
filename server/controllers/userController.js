import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import validator from'validator'
import transactionModel from "../models/transactionModel.js"
import Razorpay from 'razorpay';

const registerUser = async(req, res)=>{
  try {
    const {name,email,password} =req.body;

    if(!name ||!email || !password){
      return res.json({success:false,message:'Missing Details'})
    }

    if(!validator.isEmail(email)){
      return res.json({success:false, message:"Please enter a valid email"})
    }
    if(password.length <8){
      return res.json({success:false, message:"Please enter a strong password"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData={
      name,
      email,
      password:hashedPassword,
    }

    const newUser= new userModel(userData)
    const user = await newUser.save()
    const token= jwt.sign({id:user.id},process.env.JWT_SECRET)

    res.json({success:true,token,user:{name:user.name}})

  } catch(error){
      console.log(error)
      res.json({success:false, message:error.message})

  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        credit: user.creditBalance
      });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId); // ✅ use req.userId now

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

   res.json({
  success: true,
  credits: user.creditBalance,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})


const paymentRazorpay =async(req,res)=>{
  try {
    
     const {userId,planId}= req.body
     const userData = await userModel.findById(userId)

     if(!userId ||!planId){
      return res.json({success:false,message:'Missing Details'})

     }

     let credits,plan,amount,date

     switch (planId) {
      case 'Basic':
        plan='Basic'
        credits=3
        amount=10
        break;
      case 'Advance':
        plan='Advance'
        credits=9
        amount=30
        break;
      case 'Premier':
        plan='Premier'
        credits=15
        amount=50
        break;
     
      default:
        return res.json({success:false,message:'Plan not found'})
     }

     date= Date.now()

     const transactionData={
      userId,plan,amount,credits,date
     }

     const newTransaction = await transactionModel.create(transactionData)

     const options ={
        amount:amount*100,
        currency:process.env.CURRENCY,
        receipt: newTransaction._id,
  
     }
      await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
          console.log(error)
          return res.json({success:false,messagea:error})
        }
        res.json({success:true,order})
      })

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

const verifyRazorpay = async (req,res)=>{
  try {
    const {razorpay_order_id}=req.body
const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

if(orderInfo.status=='paid'){
  const transactionData = await transactionModel.findById(orderInfo.receipt)
  if(transactionData.payment){
    return res.json({success:false,message:'Payment Failed'})
  }
   
  const userData = await userModel.findById(transactionData.userId)
  const creditBalance = userData.creditBalance + transactionData.credits
  await userModel.findByIdAndUpdate(userData._id,{creditBalance})
  await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
  res.json({success:false,message:"Credits Added"})


}else{
  res.json({success:false,message:'Payment Failed'})
}

  } catch (error) {
    
  }
}


  export {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay}