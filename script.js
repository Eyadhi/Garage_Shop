function handleBooking(e){
e.preventDefault();
const name=document.getElementById('name').value.trim();
const phone=document.getElementById('phone').value.trim();
const date=document.getElementById('date').value;
const service=document.getElementById('serviceType').value;
if(!name||!phone||!date){document.getElementById('bookMsg').textContent='Please fill required fields.';return;}
document.getElementById('bookMsg').textContent=`Thanks, ${name}! Your request for ${service} on ${date} has been received. We will call ${phone} to confirm.`;
document.getElementById('bookingForm').reset();
}
function sendEnquiry(){
const n=document.getElementById('enqName').value.trim();
const p=document.getElementById('enqPhone').value.trim();
const m=document.getElementById('enqMsg').value.trim();
if(!n||!m){document.getElementById('enqResp').textContent='Please include your name and message.';return;}
document.getElementById('enqResp').textContent=`Thanks, ${n}! We will get back to ${p||'you'} soon.`;
document.getElementById('enqName').value='';document.getElementById('enqPhone').value='';document.getElementById('enqMsg').value='';
}