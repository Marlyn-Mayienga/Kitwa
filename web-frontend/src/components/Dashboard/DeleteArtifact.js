import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function DeleteArtifact() {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	const CArtist_token = "Token" + " " + localStorage.getItem("token");
	const artifactID = localStorage.getItem("artifact_ID");
	//  get artifact
	const handleDeleteArtifact = async () => {
		try {
			const delArtifact = await fetch(
				`http://127.0.0.1:8000/api/v1/artifact/?id=${artifactID}`,
				{
					method: "DELETE",
					headers: {
						Authorization: CArtist_token,
					},
				}
			);
			const deleteArtifactData = await delArtifact.json();
			// console.log("show me delete content", deleteArtifactData);
			if (delArtifact.ok) {
				swal("Event Deleted Successfully!", {
					icon: "success",
					timer: 1000,
				});
				navigate("/artfactview");
			} else {
				swal(deleteArtifactData.message);
			}
		} catch (error) {}
	};
	return (
		<div className="overlay">
			<div
				className="artifact-wrapper bg-white mt-4 "
				style={{
					width: "40%",
					height: "50vh",
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
							Delete Artfacts
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
							onClick={goBack}
						/>
					</div>
				</div>
				<div className="row m-0 p-3">
					<div className="col-12">
						<p>
							Are you sure, do you want to delete this{" "}
							<span style={{ color: "red" }}>artfact</span> ?
						</p>
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
							onClick={handleDeleteArtifact}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteArtifact;
