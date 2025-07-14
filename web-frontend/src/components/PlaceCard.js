import React from "react";

const PlaceCard = () => {
	return (
		<div>
			<div className="w-[80%] mx-auto bg-red-800 sm:bg-yellow-800 md:bg-green-800">
				<div></div>
				<div className="grid grid-columns-2 gap-20">
					<div className="flex">
						<div className=" ">
                            <img
                                className=""
								src={require("./images/culture-dance.jpg")}
								alt="culture-dance"
							/>
						</div>
						<div>
							<h2>Godmesa</h2>
						</div>
						<div className="flex">
							<div className=" ">
								<img
									src={require("./images/culture-dance.jpg")}
									alt="culture-dance"
								/>
							</div>
							<div>
								<h2>Godmesa</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceCard;
