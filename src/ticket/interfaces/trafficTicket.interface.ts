export interface iTrafficTicket {
    date: Date;
    time: string;
    location: string;
    plateNumber: string;
    vehicleBrand: string;
    modelYear: number;
    color: string;
    typeOfService: string; // Assuming this refers to 'Tipo de Servicio'
    infractionCode: string; // 'Codigo Infraccion' in Spanish
    lawArticleNumber: string; // 'Articulo Ley' in Spanish
    observations?: string; // Optional since there may not always be observations
    driverName: string; // Name of the driver
    driverLicenseNumber: string; // Driver's license number
    driverAddress: string; // Address of the driver
    driverPhone: string; // Phone number of the driver // Phone number of the driver // Optional since there may not always be observations
    driverEmail: string; // Email of the driver
}
