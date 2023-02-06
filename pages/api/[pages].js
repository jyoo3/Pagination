import clientPromise from "../../database/connect";
export default async function handler(req, res) {
  console.log("in pages");
  const client = await clientPromise;
  const db = client.db("myDatabase");
  var order = req.headers.order == 'true' ? 1 : -1;
  var column = req.headers.col;
  var options={};
  options = {
    "limit":Number(req.headers.limit) == 0 ? 5 : Number(req.headers.limit),
    "skip":(Number(req.query.pages)-1)*Number(req.headers.limit),
    "sort": {[column]:order},
    "projection":{_id:0},
}

var filters = req.headers.filters;
filters = JSON.parse(filters);
console.log("filters",filters);
const find={};
var gf=[];
filters.map((filter)=>{
  if(filter.type=='Equals'){ 
    const regex = new RegExp(`^${filter.val}$`,"i");
    if(filter.col =='age' || filter.col == 'emp_id')
      find[filter.col] = Number(filter.val);
    else if(filter.col == 'doj')
      find[filter.col] = new Date(filter.val);
    else  
      find[filter.col] = regex;
  }

  else if(filter.type == 'Does Not Equal'){
    const regex = new RegExp(`^${filter.val}$`,"i");
    if(filter.col =='age' || filter.col == 'emp_id')  
      find[filter.col] = {...find[filter.col],['$ne']:Number(filter.val)};
    else if (filter.col == 'date')  
      find[filter.col] = {...find[filter.col],['$ne']:new Date(filter.val)};
    else   
      find[filter.col]= {...find[filter.col], ['$not']:  regex};
  }
  else if(filter.type=='Begins With'){
    const regex = new RegExp(`^${filter.val}`,"i")
    find[filter.col] = {["$regex"] : regex};
  }
  else if(filter.type == 'Ends With'){
  const regex = new RegExp(`${filter.val}$`,"i")
    find[filter.col] = {["$regex"] : regex }
  }
  else if(filter.type == 'Contains'){
    const regex = new RegExp(filter.val,"i")
    if(req.headers.gfilter == 'true'){
      gf.push({[filter.col]:{["$regex"] : regex }})
    }
    else
    find[filter.col] = {["$regex"] : regex }
    console.log("in contains",find);
  }
  else if(filter.type == 'Does Not Contain'){
    const regex = new RegExp(filter.val,"i")
    find[filter.col] = {$not:{ ["$regex"] : regex }}
  }
  else if(filter.type == 'Greater Than'){
    if(filter.col == 'doj') find[filter.col] = {...find[filter.col],["$gt"] : new Date(filter.val)}
    else
      find[filter.col] = {...find[filter.col],["$gt"] : Number(filter.val) }
  }
  else if(filter.type == 'Less Than'){
    if(filter.col == 'doj') find[filter.col] = {...find[filter.col],["$lt"] : new Date(filter.val)}
    else
      find[filter.col] = {...find[filter.col],["$lt"] : Number(filter.val) }
  }
  else if(filter.type == 'Greater Than Equal'){
    find[filter.col] = {["$gte"] : (filter.col == 'doj') ? new Date(filter.val) : Number(filter.val) }
  }
  else if(filter.type == 'Less Than Equal'){
    find[filter.col] = {["$lte"] : (filter.col == 'doj') ? new Date(filter.val) : Number(filter.val) }
  }
})
console.log("find query",find);
console.log(options);
if(req.headers.gfilter == 'true') {
  console.log("gf",gf);
  find['$or'] = gf;
}
gf=[];
console.log("global find",find); 
  const employees = await db.collection("emp_details").find(find,options).toArray();
  console.table(employees);
  const count = await db.collection("emp_details").find(find).count();
    res.json({ count:count, data: employees });
  
}

// seo,rtk query,handle ctrl R, cms applications, 