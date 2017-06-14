var customerData = require('./data').customerData;

var Customers = {
    getCustomers: function(){
        return customerData;
    },
    getCustomerById: function(ID){
        var cust = customerData.filter(function(customer,index){
            return customer.id === ID;
        });
        return cust[0];
    },
    saveCustomer: function(details){
        var custs = customerData;
        custs = custs.filter(function(customer,index){
            return customer.id!==details.id && customer;
        });
            custs.push(details);
            return custs;
        
        
    },
    deleteCustomer: function(ID){
        var custs = customerData;
        custs = custs.filter(function(customer,index){
            return customer.id!==ID && customer;
        });
        console.log(custs);
    }
}

module.exports = Customers;