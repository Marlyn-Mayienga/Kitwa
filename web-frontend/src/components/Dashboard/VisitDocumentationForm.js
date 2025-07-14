import React from 'react'

function VisitDocumentationForm() {
    return (
			<div className="buyFormWrapper d-flex align-items-center justify-content-center bg-body-secondary">
				<div
					className="form-container bg-white p-4"
					style={{ borderRadius: "4px", width: "520px" }}
				>
					<div className="row">
						<div className="col-6" style={{ margin: "0px", padding: "0px" }}>
							<img
								src={require("../images/culture-dance.jpg")}
								style={{
									width: "100%",
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
						</div>
						<div className="col-6">
							<div className="mb-3">
								<label htmlFor="quantity" className="form-label">
									Description
								</label>
								<textarea
									type="text"
									id="description"
									className="form-control"
									placeholder="This visit was amazing"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="File" className="form-label">
									File
								</label>
								<input
									type="file"
									id="file"
									className="form-control"
									// placeholder="Image, Audio, Video"
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
								>
									Share your visit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default VisitDocumentationForm
