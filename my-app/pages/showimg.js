function ShowImage({ data }) {
    // Get the image data
    const image = data.imgData.data;

    // Convert into blob into string with charset=utf-8
    const base64Image = Buffer.from(image, 'base64').toString('utf-8');

    // Configure the image tag attribute (src)
    const imgSrc = "data:image/png;base64," + base64Image;
    
    // Render into HTML
    return (
        <div>
            <img src={imgSrc} />
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from the server
    const response = await fetch('http://localhost:4000/show-images');

    // Get the json response
    const data = await response.json();
    return {
        props: { data },
    }
}

export default ShowImage