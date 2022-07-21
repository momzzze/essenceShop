
export const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block"><span>Get connected with us on social networks:</span></div>
                    <div>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-facebook-f" /></a>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-twitter" /></a>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-google" /></a>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-instagram" /></a>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-linkedin" /></a>
                        <a href="/#" className="me-4 text-reset"><i className="fab fa-github" /></a>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />Essence</h6>
                                <p>This is one project created for educational purposes.
                                    Builded on react.</p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <p><a href="#!" className="text-reset">Angular</a></p>
                                <p><a href="#!" className="text-reset">React</a></p>
                                <p><a href="#!" className="text-reset">Vue</a></p>
                                <p><a href="#!" className="text-reset">Laravel</a></p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p><a href="#!" className="text-reset">Pricing</a></p>
                                <p><a href="#!" className="text-reset">Settings</a></p>
                                <p><a href="#!" className="text-reset">Orders</a></p>
                                <p><a href="#!" className="text-reset">Help</a></p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3" /> Panaguyrishte, Tzar Osvoboditel 3, BG</p>
                                <p><i className="fas fa-envelope me-3" />nikola@ninov.org</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                    © 2022 Copyright:
                    <a className="text-reset fw-bold" href="https://github.com/momzzze">momzzze</a>
                </div>
            </footer>
        </>

    )
}