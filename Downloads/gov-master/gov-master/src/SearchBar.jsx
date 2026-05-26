function SearchBar({filtr, setFiltr}) {
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Szukaj..." value={filtr} onChange={(e) => setFiltr(e.target.value)} />
        </div>
    );
}

export default SearchBar;