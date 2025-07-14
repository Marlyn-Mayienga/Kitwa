import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

function BuyArtifact() {
	const navigate = useNavigate();
	const id = localStorage.getItem("artifactID");
	// const artifactPrice = localStorage.getItem("artfactprice")

	const [quantity, setQuantity] = useState("");
	const [delivery_address, setDelivery_address] = useState("");
	const [priceOfOneArtifact, setPriceOfOneArtifact] = useState(5000);

	const CL_token = "Token" + " " + localStorage.getItem("token");

	const total = quantity ? quantity * priceOfOneArtifact : 0;

	const buyProcess = () => {
		navigate("/wrapper");
	};


	const handleBuyArtifact = async () => {
		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/v1/buy-artifact/",
				{
					method: "POST",
					headers: {
						Authorization: CL_token,
						"Content-type": "application/json",
					},
					// body: JSON.stringify(data),
					body: JSON.stringify({
						delivery_address: delivery_address,
						items: [{ id: id, quantity: quantity }],
					}),
				}
			);
			console.log("show me these item response", response.data)
			if (response.ok) {
				if (response.status === 200) {
					
				} else {
					console.error("recheck again!!")
				}
			}
		} catch (error) {
			console.error("something went wrong")
		}
		
	}

	return (
		<div className="buyFormWrapper d-flex align-items-center justify-content-center bg-body-secondary">
			<div
				className="form-container bg-white p-4"
				style={{ borderRadius: "4px", width: "520px" }}
			>
				<div className="row">
					<div className="col-6" style={{ margin: "0px", padding: "0px" }}>
						<img
							src={require("../images/calabash2.jpg")}
							style={{ width: "100%", objectFit: "cover", borderRadius: "4px" }}
							alt="Artifact"
						/>
					</div>
					<div className="col-6">
						<div className="mb-3">
							<label htmlFor="quantity" className="form-label">
								Quantity
							</label>
							<input
								type="text"
								id="quantity"
								className="form-control"
								placeholder="1"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="location" className="form-label">
								Location
							</label>
							<input
								type="text"
								id="location"
								className="form-control"
								value={delivery_address}
								onChange={(e) => setDelivery_address(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="price" className="form-label">
								Price of one artifact
							</label>
							<input
								type="number"
								id="price"
								className="form-control"
								placeholder="5000 Ksh"
								value={priceOfOneArtifact}
								onChange={(e) => setPriceOfOneArtifact(e.target.value)}
								disabled
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="total" className="form-label">
								Total price
							</label>
							<input
								type="number"
								id="total"
								className="form-control"
								placeholder="5000 Ksh"
								value={total}
								disabled
							/>
						</div>
					</div>
					<div className="col-12">
						<div className="text-center my-3">
							<button
								style={{
									color: "white",
									border: "none",
									borderRadius: "4px",
									fontSize: "18px",
									backgroundColor: "#1B84E6",
								}}
								onClick={buyProcess}
								// onClick={handleBuyArtifact}
							>
								Buy Artifact
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BuyArtifact;
