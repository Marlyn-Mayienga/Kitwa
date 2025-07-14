import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';

function UpdateArtifact() {
  return (
    <div className="overlay">
      <div
            className="artifact-wrapper bg-white mt-4 "
            style={{
                width: "70%",
                height: "90vh",
                border: "none",
                borderRadius: "10px",
            }}
        >
						<div className="row m-0">
							<div className="col-md-7">
								<h6
									style={{
										height: "10vh",
										textAlign: "right",
										marginTop: "20px",
									}}
								>
									Update Artfacts
								</h6>
							</div>
							<div className="col" style={{ textAlign: "right" }}>
								<FontAwesomeIcon
									icon={faTimes}
									style={{
										color: "#e91607",
										fontSize: "52px",
										cursor: "pointer",
									}}
									// onClick={closeOverlay}
								/>
							</div>
						</div>
						<div className="row m-0 p-3">
							<div className="col-md-6">
								<label>Name</label> <br />
								<input
									type="text"
									placeholder=""
									id="name"
									style={{ width: "100%", height: "10vh" }}
									// value={name}
									// onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Description</label> <br />
								<input
									type="description"
									placeholder=""
									id="description"
									style={{ width: "100%", height: "10vh" }}
									// value={description}
									// onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Quantity</label> <br />
								<input
									type="text"
									placeholder=""
									id="quantity"
									style={{ width: "100%", height: "10vh" }}
									// value={quantity}
									// onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Price</label> <br />
								<input
									type="text"
									placeholder=""
									id="price"
									style={{ width: "100%", height: "10vh" }}
									// value={price}
									// onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Event</label> <br />
								<select
									// value={event_id}
									// onChange={(e) => setEvent(e.target.value)}
								>
									<option value="">Choose event</option> {/* Default value */}
									{/* {allevents.map((eventID, index) => (
										<option key={index} value={eventID.id}>
											{eventID.id}
										</option>
									))} */}
								</select>
							</div>

							<div className="col-md-6">
								<label>Upload media</label> <br />
								<input
									type="file"
									placeholder=""
									id="file"
									style={{ width: "100%", height: "10vh" }}
									// value={file}
									// onChange={(e) => setFile(e.target.value)}
								/>
							</div>
							<div className="col-md-7">
								<button
									style={{
										marginTop: "40px",
										width: "80px",
										padding: "10px",
										border: "none",
										borderRadius: "10px",
										backgroundColor: "#0F75BC",
										color: "white",
									}}
									// onClick={createArtfact}
								>
									Update
								</button>
							</div>
						</div>
					</div>

    </div>
  )
}

export default UpdateArtifact
