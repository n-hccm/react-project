
import React from "react";
import { useNavigate } from "react-router-dom";

import * as memdb from '../../memory/memdb';

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
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "baseline", width: "100%" }}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={e => {setSearch(e.target.value); setPage(1);}}
                    style={{ padding: "0.5rem", width: "100%" }}
                />

                {/*<button onClick={() => {fetchPage(page);}} style={{ marginLeft: 8, backgroundColor: "blue", color: "white" }}>Buscar</button>*/}
                <button onClick={() => { setSearch(""); fetchPage(page); }} style={{ marginLeft: 8, backgroundColor: "gray", color: "white" }}>Clear</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/edit/${customer.id}`)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                    title="Edit"
                                >✏️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
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
                        style={{ width: '60px', marginLeft: '0.5rem' }}
                    />
                    <span> / {totalPages}</span>
                </label>

                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>

            <button
                onClick={() => navigate("/new")}
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#76a9df",
                    color: "white",
                    fontSize: "24px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    padding: 0,
                }}
                title="Add Customer"
            >
                ➕
            </button>

        </>
    );
};

export default CustomerList;