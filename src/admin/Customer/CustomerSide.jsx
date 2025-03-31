import { Link } from "react-router-dom";
import "./customer.css";

export default function CustomerSide({customers}) {
    return (
        <aside className="customer-aside">
            <h2>Kunden</h2>
            <ul className="customername">
                {customers.map((customer) => (
                    <li key={customer._id}>
                        <Link to={`/admin/customer/${customer._id}`} className="album-link">
                            <p className='customer-name'>{customer.lastname}, {customer.firstname}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}