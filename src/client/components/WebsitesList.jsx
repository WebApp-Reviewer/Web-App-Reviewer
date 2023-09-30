// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from 'jwt-decode'

// const WebsitesList = ({ websites }) => {
//     const token = localStorage.getItem('token');
//     const { username } = token ? jwt_decode(token) : { username: '' };
//     const navigate = useNavigate();

//     const navigateSingleWebsite = ({ _id, authorid, name, url, description, image}) => {
//         navigate('/websites/:id', {
//             state: { _id, authorid, name, url, description, image }
//         });
//     };


// return (
//     <section>
//         {websites.map(({ _id, authorid, name, url, description, image }) => (
//             <div key={_id} className="website-list">
//                 <div onClick={() => navigateSingleWebsite({ _id, authorid, name, url, description, image })}>
//                     <h2>{name}</h2>
//                     {image && <img src={imageUrl} alt={`Image for ${title}`} />}
//                     {description && <h4>Description: </h4>}
//                     {url && <h2> URL: </h2>}
//                 </div>
//                 <div>
//                     {authorid.username === username && (
//                         <button
//                             onClick={() => editWebsite({ _id, authorid, name, url, description, image })}
//                             >
//                                 Edit
//                             </button>
//                     )}
//                 </div>
//             </div>
//         ))}
//     </section>
//     );
// }

// WebsitesList.propTypes = {
//     websites: PropTypes.arrayOf(
//         PropTypes.shape({
//             _id: PropTypes.string.isRequired,
//             author: PropTypes.shape({
//                 authorid: PropTypes.string.isRequired,
//                 username: PropTypes.string.isRequired,
//             }).isRequired,
//             name: PropTypes.string.isRequired,
//             url: PropTypes.string,
//             description: PropTypes.string,
//             image: PropTypes.string, 
//         })
//     ).isRequired,
// }

// export default WebsitesList;

import React from "react";
import { Link } from "react-router-dom";
import { fetchAllWebsites } from "../ajaxHelper";
import "../Style/WebsitesList.css";

export default function WebsitesList() {
    const [websites, setWebsites] = React.useState([]);

    React.useEffect(() => {
        async function allWebsitesHandler() {
            const result = await fetchAllWebsites();
            setWebsites(result.websites);
        }
        allWebsitesHandler();
    }, []);

    return (
        <div>
            {websites.map((website) => (
                <div key={website?.id} className="website-container">
                    {/* Wrap the name and image with a Link */}
                    <Link to={`/websites/${website?.id}`}>
                        <h1 className="website-name">{website?.name}</h1>
                        <img
                            className="website-image"
                            src={website?.image}
                            alt={`Image for ${website?.name}`}
                        />
                    </Link>
                    <h2 className="website-description">{website?.description}</h2>
                    <a
                        className="website-url"
                        href={website?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {website?.url}
                    </a>
                </div>
            ))}
        </div>
    );
}