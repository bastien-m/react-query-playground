import React from "react"
import { useQuery, useQueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

type Pagination = {
    page: number;
    size: number;
}

type Quantity = {
    name: string;
    description: string;
}

function getQuantities(pagination?: Pagination): Promise<Quantity[]> {
    pagination = pagination ?? {page: 0, size: 5}
    return fetch('/quantities/search', 
    { method: "POST", headers: { 'content-type': 'application/json;charset=UTF-8'}
    , body: JSON.stringify(pagination)}).then(res => res.json())
}

export default function PaginatedResource() {

    const [size, setSize] = React.useState<number>(5);
    const [page, setPage] = React.useState<number>(0);

    const queryClient = useQueryClient();

    const { data } = useQuery(["quantitiesPaginated", size], () => {
        console.log('fetch data')
        return getQuantities({page, size})
    }, { keepPreviousData: true, refetchOnWindowFocus: false, staleTime: 60000})


    const resetQuery = () => {
        queryClient.invalidateQueries(["quantitiesPaginated", size])
    }

    return (
        <div>
            {data && data.map((d, i) => (
                <div key={i}>
                    <div>{d.name}</div>
                    <div>{d.description}</div>
                </div>
            ))}
            <div className="form">
                Size:
                <input type="text" value={size} onChange={(e) => setSize(+e.target.value)} />
                Page:
                <input type="text" value={page} onChange={(e) => setPage(+e.target.value)} />
            </div>
            <button type="button" onClick={resetQuery}>Reset query</button>
            <ReactQueryDevtools initialIsOpen/>
        </div>
    )

}