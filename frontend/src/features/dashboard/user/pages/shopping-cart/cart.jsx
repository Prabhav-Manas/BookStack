const Cart=({props})=>{
    console.log("Cart Props:=>", props);
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>John</td>
                                <td>Doe</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Cart;