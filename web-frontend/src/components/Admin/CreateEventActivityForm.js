import React from 'react'
import CreateEvent from './CreateEvent';

function CreateEventActivity() {
  return (
		<div>
			<CreateEvent />
			<div className="overlay">
				<div
					className="overlay-container"
					style={{
						backgroundColor: "#FFFFFF",
						width: "70%",
						marginTop: "9%",
						marginBottom: "1%",
						textAlign: "center",
					}}
				>
					<h4 style={{ fontSize: "24px", fontWeight: "normal" }}>Add Event Activity </h4>

					<div
						className="row"
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-around",
						}}
					>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Name</label> <br />
								<input type="Text" name="name-of-the-event" />
							</div>
							<div style={{ display: "flex", gap: "10px" }}>
								<div style={{ flex: 1 }}>
									<label>Date</label> <br />
									<input type="Text" name="name-of-the-event" />
								</div>

								<div style={{ flex: 1 }}>
									<label>Frequency</label> <br />
									<input type="Text" name="name-of-the-event" />
								</div>
							</div>
							<div style={{ display: "flex", gap: "10px" }}>
								<div style={{ flex: 1 }}>
									<label>Ticket price</label> <br />
									<input type="Text" name="name-of-the-event" />
								</div>
								<div style={{ flex: 1 }}>
									<label>Location</label> <br />
									<input type="Text" name="name-of-the-event" />
								</div>
							</div>
						</div>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Photo</label> <br />
								<input
									type="file"
									name="name-of-the-event"
									style={{
										padding: "70px 10px",
									}}
								/>
							</div>
							<div>
								<label>Description</label> <br />
								<input
									type="Text"
									name="name-of-the-event"
									style={{
										padding: "35px 10px",
									}}
								/>
							</div>
						</div>
					</div>
					<button
						style={{
							backgroundColor: "#0F75BC",
							color: "#FFF",
							fontSize: "18px",
							fontWeight: "normal",
							padding: "6px 20px",
							border: "none",
							borderRadius: "4px",

							//
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateEventActivity
