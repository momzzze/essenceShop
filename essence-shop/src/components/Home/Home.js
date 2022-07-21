
export const Home = () => {

    return (
        <>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774__340.jpg" alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://cdn.pixabay.com/photo/2022/07/06/09/41/shutters-7304728__340.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://cdn.pixabay.com/photo/2022/07/05/18/10/butterfly-7303688__480.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <div
                className="p-5 text-center bg-image">
                <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Heading</h1>
                            <h4 className="mb-3">Subheading</h4>
                            <a className="btn btn-outline-light btn-lg" href="#!" role="button">
                                Call to action
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}