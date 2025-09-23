import React from "react";
import { useNavigate } from "react-router-dom";
import * as memdb from '../../memory/memdb';
import './CustomerList.css'; // 👈 Importa los estilos

const PAGE_SIZE = 5;

const CustomerList: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [inputPage, setInputPage] = React.useState("1");
    const [totalPages, setTotalPages] = React.useState(1);
    const [search, setSearch] = React.useState("");

    const navigate = useNavigate();

    const fetchPage = async (pageNum: number) => {
        const result = await memdb.getPage(pageNum, PAGE_SIZE, search.toLowerCase());
        setData(result.data);
        setPage(result.currentPage);
        setInputPage(result.currentPage.toString());
        setTotalPages(result.totalPages);
    };

    React.useEffect(() => {
        fetchPage(page);
    }, [page, search]);

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    const handleInputSubmit = () => {
        const pageNum = parseInt(inputPage, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            setPage(pageNum);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputSubmit();
        }
    };

    const handleInputBlur = () => {
        handleInputSubmit();
    };

    return (
        <>
            <h2>Customer List (Page {page} of {totalPages})</h2>
            <button
                style={{ width: '100%' }}
                onClick={() => {
                    localStorage.removeItem("loggedUser");
                    navigate("/login");
                }}
            >
                Logout
            </button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
                <button className="btn-clear" onClick={() => { setSearch(""); fetchPage(page); }}>
                    Clear
                </button>
                <button
                    onClick={() => navigate("/new")}
                    className="fab"
                    title="Add Customer"
                >
                    ➕
                </button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/edit/${customer.id}`)}
                                        className="edit-button"
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>

                <label>
                    Page:
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onBlur={handleInputBlur}
                        min={1}
                        max={totalPages}
                    />
                    <span> / {totalPages}</span>
                </label>

                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </>
    );
};

export default CustomerList;
