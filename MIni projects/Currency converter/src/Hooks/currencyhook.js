import { useEffect, useState } from "react";


function usecurrencyinfo(currency) {
    const [cholder, setcholder] = useState({})
    useEffect(() => {

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json()).then(res => setcholder(res[currency]))

    }, [currency])

    return cholder;

}

export default usecurrencyinfo;