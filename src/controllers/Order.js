const Order = require('../models/Order');
const Product = require('../models/Product');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const WEB_HOOK_SECRET = process.env.WEB_HOOK_SECRET;

// const createStripePayment = catchAsync(async (req, res) => {
//   const { amount, receipt_email, shipping } = req.body;
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency: 'usd',
//     receipt_email,
//     payment_method_types: ['card'],
//     description: 'Purchase NFC Tags',
//     shipping,
//   });
//   res.status(200).send({
//     clientSecret: paymentIntent.client_secret,
//     paymentIntent,
//   });
// });

// const implementWebhook = catchAsync(async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   const payload = req.body;
//   const payloadString = JSON.stringify(payload, null, 2);
//   const header = stripe.webhooks.generateTestHeaderString({
//     payload: payloadString,
//     secret: WEB_HOOK_SECRET,
//   });
//   console.log('hooks', sig);
//   // console.log("req.body", payloadString)
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       payloadString,
//       header,
//       WEB_HOOK_SECRET
//     );

//     // console.log("event", event)
//   } catch (e) {
//     console.log('error shown', e);
//   }

//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;
//       console.log(`session ${session}`);
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     case 'payment_intent.payment_failed':
//       const paymentIntentFailed = event.data.object;
//       // Then define and call a function to handle the event payment_intent.payment_failed
//       break;
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;

//       console.log('description', paymentIntent.toString());
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }
//   res.status(200).json({ success: 'success' });
// });

// const savingToCustomer = async (
//   items,
//   email,
//   firstName,
//   lastName,
//   address,
//   city,
//   country,
//   state,
//   zip,
//   phoneNumber,
//   totalPrice,
//   refCode
// ) => {
//   const myArray = items.map(async item => {
//     try {
//       const product = await Product.findById(item.id).exec();

//       return {
//         productId: product._id,
//         name: product.name,
//         image: product.imageUrl[0],
//         orgPrice: product.price,
//         qty: item.quantity,
//         customDesign: item.customDesign,
//       };
//     } catch (e) {
//       console.log('wrong', e);
//     }
//   });

//   const values = await Promise.all(myArray);

//   try {
//     const order = await Order.create({
//       name: ` ${firstName} ${lastName}`,
//       email: email,
//       totalPrice: totalPrice,
//       addressCustomer: {
//         address,
//         city,
//         country,
//         state,
//         zip,
//         phoneNumber,
//       },
//       products: values,
//       coupon: refCode,
//     });
//   } catch (e) {
//     console.log('wrong', e);
//   }
// };

// module.exports.product_update = (req, res) => {
//   const {
//     items,
//     email,
//     firstName,
//     lastName,
//     refCode,
//     totalQuantity,
//     orgPrice,
//     totalPrice,
//     addressCustomer,
//     codeIsValid,
//     couponCode,
//   } = req.body;

//   console.log(codeIsValid, couponCode);

//   const { address, city, country, state, zip, phoneNumber } = addressCustomer;

//   var mail_body = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
//     "http://www.w3.org/TR/html4/loose.dtd">
//  <html lang="en">
//  <head>
//      <meta name="viewport" content="width=device-width;initial-scale=1.0; user-scalable=1;" />
//  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet">
//      <title>Confirmation Email || SWOP</title>
//      <style>
//          .table{
//              border:1px solid #D3D3D3;
//              margin-bottom: 0px;
//              width: 100%;
//              border-spacing: 0px;
//          }
//          .table>thead {
//          vertical-align: bottom;
//          background-color: #D3D3D3;
//      }
//      .table>:not(:last-child)>:last-child>* {
//          border-bottom-color: inherit;
//      }
//          .table > tbody > tr > .no-line {

//                  }

//                  .table > thead > tr > .no-line {
//                      border-bottom: none;
//                  }

//                  .table > tbody > tr > .thick-line {
//                      border-top: 1px solid;
//                  }

//                  .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
//                      padding: 8px;
//                      line-height: 1.428571429;
//                      vertical-align: top;
//                      border-top: 1px solid #ddd;
//                  }

//                  .table-condensed>thead>tr>th, .table-condensed>tbody>tr>th, .table-condensed>tfoot>tr>th, .table-condensed>thead>tr>td, .table-condensed>tbody>tr>td, .table-condensed>tfoot>tr>td {
//                      padding: 5px;
//                      border-right: 1px solid #D3D3D3;
//                      vertical-align: middle;

//                  }
//      </style>
//  </head>
//  <body style="font-family: 'Roboto', sans-serif !important;font-weight: 400;">

//      <table style="margin:0 auto; padding:0; cellpadding:0; cellspacing:0; background-color: #ffffff; width: 660px; height: auto; ">
//          <tr>
//              <td style="text-align: center;">
//                  <a href="https://www.sowpme.co" style=""><img src="https://www.swopme.co/static/media/shipping_color_icon.d9aaca56e82d57df1bc3df7f2a503ccf.svg" alt="swop logo" width="150" style="padding-top: 4%;"></a>
//              </td>
//          </tr>
//          <tr>
//              <td style="text-align: center;padding: 0% 15%;">
//                  <p style="">Dear,</p>
//                  <p style="">Congratulation.</p>
//                  <p style="">You NFC chip has been purchased successfully.</p>
//              </td>
//          </tr>
//          <tr >
//              <td style="padding: 25px 5px; text-align: center;">
//                  <a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 15px 35px; color: #ffffff;border-radius: 10px;font-size: 14px;">SWOP Order Confirmation</a>
//              </td>
//          </tr>
//          <tr>
//              <td style="padding: 0% 10%;">
//                  <div class="ditail" style="">
//                      <p><span style="text-align: left;">Name </span> <span style="text-align: center;margin-left: 10px;margin-right: 10px;"> :</span>	   <span style="text-align: right;position: absolute;">${firstName} ${lastName}</span></p>
//                      <p><span style="text-align: left;">Email </span> <span style="text-align: center;margin-left: 10px;margin-right: 10px;">  :</span>	 <span style="text-align: right;position: absolute;">${email}</span></p>
//                      <p><span style="text-align: left;">Phone   </span> <span style="text-align: center;margin-left: 10px;margin-right: 10px;"> :</span>	   <span style="text-align: right;position: absolute;">${phoneNumber}</span></p>
//                      <p>Product Details : </p>
//                      <div style="">
//                          <div class="table-responsive">
//                              <table class="table table-condensed">
//                                  <thead>
//                                      <tr>
//                                          <td style="text-align:center;font-size: 14px;"><strong>Products</strong></td>
//                                          <td style="text-align:center;font-size: 14px;"><strong>Qty</strong></td>
//                                          <td style="text-align:center;font-size: 14px;"><strong>Price</strong></td>
//                                      </tr>
//                                  </thead>
//                                  <tbody>`;
//   var product_info = '';
//   for (var i in items) {
//     product_info += `<tr>
//                                     <td style="text-align:center;font-size: 14px;">${items[i].name}</td>
//                                     <td style="text-align:center;font-size: 14px;">${items[i].quantity}</td>
//                                     <td style="text-align:center;font-size: 14px;">${items[i].price}</td>
//                                 </tr> `;
//   }
//   mail_body = `${mail_body}${product_info}
//                                  </tbody>
//                              </table>
//                          </div>
//                      </div>
//                      <div style="color:#000;">
//                          <table style="text-align:right;width: 100%" class="subtotal_table" >
//                              <tbody>`;
//   if (couponCode && couponCode.coupon_type === 'Free Product') {
//     mail_body = `${mail_body}
//                               <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Subtotal :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong style="text-decoration: line-through;">$<span>${orgPrice}</span><strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Delivery Charge :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>${totalPrice}<strong></td>
//                                  </tr>
//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Discount :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>${orgPrice}<strong></td>
//                                  </tr>
//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Order Total :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$<span>${totalPrice}</span><strong></td>
//                                  </tr>`;
//   } else if (couponCode && couponCode.coupon_type === 'Percentage') {
//     mail_body = `${mail_body}
//                               <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Subtotal :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$<span>${orgPrice}</span><strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Delivery Charge :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong style="text-decoration: line-through;">$5.99<strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Discount :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>${(
//                                        orgPrice - totalPrice
//                                      ).toFixed(2)}<strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Order Total :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$<span>${totalPrice}</span><strong></td>
//                                  </tr>`;
//   } else {
//     mail_body = `${mail_body}
//                               <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Subtotal :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$<span>${orgPrice}</span><strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Delivery Charge :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong style="text-decoration: line-through;">$5.99<strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Discount :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$5.99<strong></td>
//                                  </tr>

//                                  <tr>
//                                      <td style="width: 44%;font-size: 14px;padding: 2px 0px;">Order Total :</td>
//                                      <td style="width: 9%;font-size: 14px;padding: 2px 0px;"><strong>$<span>${totalPrice}</span><strong></td>
//                                  </tr>`;
//   }
//   mail_body = `${mail_body}
//                              </tbody>
//                          </table>

//                      </div>`;
//   if (couponCode && couponCode.code_type === 'referral' && codeIsValid) {
//     mail_body = `${mail_body}  <p><span style="text-align: left;">Free Product </span> <span style="text-align: center;margin-left: 10px;margin-right: 10px;"> :</span>	   <span style="text-align: right;position: absolute;">1PC Free NFC Chip</span></p>					`;
//   }
//   mail_body = `${mail_body}
//                  </div>

//              </td>
//          </tr>
//          <tr>
//              <td style="text-align: center;padding: 20px;">
//                  <span style="">Thank you for using our service</span>
//              </td>
//          </tr>
//          <tr>
//              <td style="text-align: center;padding: 5%;">
//                  <p>Regards,</p>
//                  <p style="margin: 0;font-size: 18px; font-weight: 600;"><b>The SWOP Team</b></p>
//                  <p style="margin: 0;"><a href="https://www.sowpme.co/" style="color: #2AB6FE;text-decoration: none;font-size: 18px; font-weight: 400;">www.sowpme.co</a></p>
//              </td>
//              </td>
//          </tr>
//          <tr style="background: rgb(154,113,231);background: -moz-linear-gradient(left,  rgba(154,113,231,1) 0%, rgba(108,50,222,1) 57%);
//  background: -webkit-linear-gradient(left,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);background: linear-gradient(to right,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9a71e7', endColorstr='#6c32de',GradientType=1 );color: #ffffff;text-align: center;">
//              <td>
//                  <footer>
//                      <p style="margin-bottom: 0px;">
//                          <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/sm.png" alt="" style="height: 40px;padding-bottom: 15px;"></a>
//                      </p>
//                      <p style="
//      margin-top: 2px;
//  ">
//                          <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/fb.png" alt="" style="width: 30px; height: 30px;margin-right: 10px;"></a>
//                          <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ins.png" alt="" style="width: 30px; height: 30px;margin-right: 10px;"></a>
//                          <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/yt.png" alt="" style="width: 30px; height: 30px;margin-right: 10px;"></a>
//                      <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/tw.png" alt="" style="width: 30px; height: 30px;margin-right: 10px;"></a>
//                  <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/in.png" alt="" style="width: 30px; height: 30px;margin-right: 10px;"></a>
//                  <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ttk.png" alt="" style="width: 30px; height: 30px;"></a>
//              </p>
//              <p style="
//      margin: 5px;padding:5px
//  "><a href="https://www.sowpme.co/" style="color: #ffffff;text-decoration: none;font-weight: 400;">www.sowpme.co</a></p>
//                  </footer>
//              </td>
//          </tr>
//      </table>

//  </body>
//  </html>`;
//   const msg = {
//     to: email,
//     from: 'SWOP <info@swopme.co>',
//     subject: 'Order Confirmation',
//     html: mail_body,
//   };

//   sgMail.send(msg, (err, notiEmail) => {
//     if (err) {
//       console.log(err);
//       console.log('email not sent');
//     } else {
//       console.log('email sent');
//     }
//   });

//   ///product update and delete
//   items.map(item => productQuery(item.id, item.quantity));

//   ///adding reward to the user whose refCode is used

//   if (codeIsValid && couponCode.code_type === 'referral') {
//     // addRewardToCustomer(refCode);
//     savingToCustomer(
//       items,
//       email,
//       firstName,
//       lastName,
//       address,
//       city,
//       country,
//       state,
//       zip,
//       phoneNumber,
//       totalPrice,
//       refCode
//     );
//   } else {
//     savingToCustomer(
//       items,
//       email,
//       firstName,
//       lastName,
//       address,
//       city,
//       country,
//       state,
//       zip,
//       phoneNumber,
//       totalPrice,
//       ''
//     );
//   }

//   ///saving customer for order route

//   res.status(200).json({ success: 'success' });
// };

const createOrder = catchAsync(async (req, res) => {
  const key = process.env.TEST_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const order = new Order(req.body);

  const savedOrder = await order.save();
  res.status(200).json({
    status: 'success',
    data: order,
    key,
  });
});

const confirmOrder = catchAsync(async (req, res) => {
  const data = req.body;
  console.log('data', data);
  const order = await Order.findOne({ sessionId: data.id });

  if (!order) {
    return res.status(400).json({
      status: 'fail',
      message: 'Order not found',
    });
  }
  order.paymentStatus = data.payment_status;
  await order.save();
  console.log('done');
  return {
    status: 'success',
    order,
  };
});

module.exports = {
  createOrder,
  confirmOrder,
};
