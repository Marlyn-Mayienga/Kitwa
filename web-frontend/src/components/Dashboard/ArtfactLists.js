import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ArtistNav from "../Navigation/ArtistNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ArtfactLists() {
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const handleSelectedRow = (params) => {
		const rowData = params.row;
		setId(rowData.id);
		setName(rowData.name);
		setDescription(rowData.description);
		setQuantity(rowData.quantity);
		setPrice(rowData.price);
	};

	const handleOverlay = () => {
		setIsOverlayOpen(true);
	};
	const handleCloseOverlay = () => {
		setIsOverlayOpen(false);
	};
	const Artist_token = "Token" + " " + localStorage.getItem("token");
	const columns = [
		{ field: "id", headerName: "ID", width: 40 },
		{ field: "name", headerName: "Name", width: 120 },
		{ field: "description", headerName: "Description", width: 320 },
		{ field: "quantity", headerName: "Quantity", width: 220 },
		{ field: "price", headerName: "Price", width: 120 },
	];
	const actionColumn = [
		{
			field: "action",
			headerName: " ",
			width: 220,
			renderCell: (params) => {
				const artifactid = params.row.id;
				return (
					<div
						className="cellAction"
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							width: "220px",
						}}
					>
						<button
							type="button"
							style={{
								border: "none",
								backgroundColor: "transparent",
								cursor: "pointer",
							}}
							onClick={() => handleviewartifact(artifactid)}
						>
							<FontAwesomeIcon
								icon={faEllipsisVertical}
								style={{ fontSize: "24px" }}
							/>{" "}
						</button>
						<div className="updateButton">
							<button
								type="button"
								class="btn btn-outline-primary"
								onClick={handleOverlay}
							>
								Update
							</button>
						</div>
						<div className="cancelButton">
							<button
								type="button"
								class="btn btn-outline-danger"
								onClick={() => handledeleteartifact(artifactid)}
							>
								Delete
							</button>
						</div>
					</div>
				);
			},
		},
	];
	const handleartifactslist = async () => {
		try {
			const allartfactslist = await fetch(
				"http://127.0.0.1:8000/api/v1/artifact/",
				{
					method: "GET",
					headers: {
						Authorization: Artist_token,
						"Content-type": "application/json",
					},
				}
			);
			const allartfactslistResponse = await allartfactslist.json();

			if (allartfactslistResponse.status === 200) {
				console.log(
					"show me these all artifacts",
					allartfactslistResponse.data
				);
				setRows(allartfactslistResponse.data);
			} else {
				console.error("something went wrong");
			}
		} catch (error) {
			console.error("bad request");
		}
	};

	useEffect(() => {
		handleartifactslist();
	}, []);

	const handleviewartifact = async (artifactid) => {
		try {
			const viewartifact = await fetch(
				`http://127.0.0.1:8000/api/v1/artifact/?id=${artifactid}`,
				{
					method: "GET",
					headers: {
						Authorization: Artist_token,
						"Content-type": "application/json",
					},
				}
			);
			const oneArtifactResponse = await viewartifact.json();
			// console.log("one artifact", oneArtifactResponse);
			if (oneArtifactResponse.status === 200) {
				// navigate('/artfactdetail')
			} else {
				console.error("Bad status");
			}
		} catch (error) {
			console.error("something went wrong");
		}
	};
	const handledeleteartifact = async (artifactid) => {
		try {
			const confirmDelete = await swal({
				title: "Delete",
				text: "Are you sure, do you want to delete this artifact?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			});

			if (confirmDelete) {
				const delartifact = await fetch(
					`http://127.0.0.1:8000/api/v1/artifact/?id=${artifactid}`,
					{
						method: "DELETE",
						headers: {
							Authorization: Artist_token,
							"Content-type": "application/json",
						},
					}
				);

				const deleteResponse = await delartifact.json();
				console.log("delete", deleteResponse);

				if (deleteResponse.status === 200) {
					swal("Artifact Deleted Successfully!", {
						icon: "success",
					});
					// Optionally, you can refresh the artifacts list after successful deletion
					handleartifactslist();
				}
			}
		} catch (error) {
			console.error("Error deleting artifact", error);
		}
	};

	const handleupdateartifact = async () => {
		try {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("name", name);
			formData.append("description", description);
			formData.append("quantity", quantity);
			formData.append("price", price);

			const confirmUpdate = await swal({
				title: "Update",
				text: "Are you sure you want to update this artifact?",
				icon: "info",
				buttons: true,
				dangerMode: false,
			});

			if (confirmUpdate) {
				const response = await fetch("http://127.0.0.1:8000/api/v1/artifact/", {
					method: "PUT",
					headers: {
						Authorization: Artist_token,
					},
					body: formData,
				});

				const updateResponse = await response.json();

				if (updateResponse.status === 200) {
					swal("Artifact Updated Successfully!", {
						icon: "success",
					});

					handleartifactslist();
				} else {
					swal(
						"Update Failed",
						updateResponse.message || "An error occurred during update.",
						"error"
					);
				}
			}
		} catch (error) {
			console.error("Error updating artifact", error);
		}
	};

	return (
		<div>
			<div className="organizer-container">
				<ArtistNav />
				<div className="organizer-wrapper">
					<h3>List of all pending artifacts orders </h3>
					<DataGrid
						rows={rows}
						columns={columns.concat(actionColumn)}
						onRowClick={handleSelectedRow}
					/>
				</div>
			</div>
			{isOverlayOpen && (
				<div className="overlay-wrapper">
					<div className="update-form">
						<label>ID</label>
						<input
							type="text"
							name="id"
							value={id}
							onChange={(e) => setId(e.target.value)}
							style={{ display: "none" }}
						/>
						<label>Name</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label>Description</label>
						<input
							type="text"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<label>Quantity</label>
						<input
							type="text"
							name="quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
						<label>Price</label>
						<input
							type="text"
							name="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<div className="overlay-btn">
							<button
								type="submit"
								class="btn btn-outline-primary"
								onClick={handleupdateartifact}
							>
								Update
							</button>
							<button
								type="button"
								class="btn btn-outline-danger"
								onClick={handleCloseOverlay}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ArtfactLists;
