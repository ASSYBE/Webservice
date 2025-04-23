// import axiosClient from "../api/axios-client";
import axios from "axios";
import { parseString } from "xml2js";

function LoginPage() {
    // async function LogUser() {
    //     // var username = document.querySelector("input[type='text']").value;
    //     // var password = document.querySelector("input[type='password']").value;

    //     // if (username && password) {
    //         let xmlData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://schema.example.com">
    //             <soapenv:Header/>
    //             <soapenv:Body>
    //             <sch:GetChercheur>
    //                 <login>bilan</login>
    //                 <password>#@1410032025%@</password> 
    //                 <cin>TN33333</cin>
    //                 <password_ch>TN33333</password_ch>
    //             </sch:GetChercheur>
    //             </soapenv:Body>
    //             </soapenv:Envelope>
    //     `;
    //         // const url = "http://localhost:8001/bo/service/call/Bilan";
    //         try {
    //             const resp = await axios.post("http://localhost:8001/api/get_data", xmlData, {
    //                 headers: {
    //                     "Content-Type" : "application/xml",
    //                     "Accept" : "application/xml",
    //                 },
    //             });

    //             if (resp.status == 200) {
    //                 console.log("Logged in successfully");
    //             } else {
    //                 console.log("Login failed");
    //             }
    //         } catch (error) {
    //             console.error("Error logging in:", error);
    //         }
    //     // } else {
    //     //     console.log("Please fill forms correctly");
    //     // }
    // }

    async function fetchSOAPData() {
        // const now = new Date();
        // const formattedDate = formatDate(now);

        const requestBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://schema.example.com">
  <soapenv:Header/>
  <soapenv:Body>
    <sch:GetChercheur>
      <login>bilan</login>
      <password>#@1321032025%@</password> 
      <cin>TN33333</cin>
      <password_ch>TN33333</password_ch>
    </sch:GetChercheur>
  </soapenv:Body>
</soapenv:Envelope>
    `;

        // console.log('date :', formattedDate);

        const headers = {
            'Content-Type': 'text/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        try {
            const response = await axios.post('http://178.18.250.209:8057/bo/service/call/Bilan', requestBody, { headers });
            parseString(response.data, (err, result) => {

                if (err) {
                    console.error('Error parsing XML:', err);
                    return;
                }

                console.log("webservice : ", JSON.stringify(result, null, 2));

                
               
            });

        } catch (error) {
            console.error('Error making SOAP request:', error);
        }
    }

    return (
        <>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Anapec Login</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">
                                    Have an account?
                                </h3>
                                <form action="#" className="login-form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control rounded-left"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input
                                            type="password"
                                            className="form-control rounded-left"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded submit p-3 px-5"
                                            onClick={fetchSOAPData}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginPage;
