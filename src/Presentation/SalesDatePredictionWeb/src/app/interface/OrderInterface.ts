export interface OrderInterface {
    orderid: number;
    custid: number | null;
    empid: number;
    orderdate: string;
    requireddate: string;
    shippeddate: string | null;
    shipperid: number;
    freight: number;
    shipname: string;
    shipaddress: string;
    shipcity: string;
    shipregion: string | null;
    shippostalcode: string | null;
    shipcountry: string;
}