export const products = [
  {
    name: "Proteína en Polvo",
    description: "Proteína en polvo de suero de leche con sabor a vainilla. Ideal para aumentar la ingesta de proteínas después del entrenamiento.",
    price: 29900,
    reference: "SUP001"
  },
  {
    name: "Multivitamínico",
    description: "Suplemento multivitamínico con una combinación de vitaminas esenciales para promover la salud general.",
    price: 14900,
    reference: "SUP002"
  },
  {
    name: "Omega-3",
    description: "Cápsulas de aceite de pescado ricas en ácidos grasos omega-3, beneficiosos para la salud cardiovascular.",
    price: 19900,
    reference: "SUP003"
  },
  {
    name: "BCAA en Polvo",
    description: "Suplemento de aminoácidos de cadena ramificada en polvo, ideal para la recuperación muscular y el rendimiento deportivo.",
    price: 24900,
    reference: "SUP004"
  }
]

export const orders = [
  {
    email: "customer1@example.com",
    password: "contrasena123",
    name: "Juan Pérez",
    documentType: "Cédula ciudadania",
    documentNumber: 123456789,
    address: "Calle 123, Ciudad Ejemplo",
    estimatedDeliveryDate: new Date("2023-10-20"),
    state: "ACEPTADA",
    orderProducts: [
      {
        productRef: "SUP001",
        quantity: 2
      },
      {
        productRef: "SUP003",
        quantity: 1
      }
    ]
  },
  {
    email: "customer2@example.com",
    password: "contrasena456",
    name: "María López",
    documentType: "Cédula extranjería",
    documentNumber: 987654321,
    address: "Avenida ABC, Otra Ciudad",
    estimatedDeliveryDate: new Date("2023-10-18"),
    state: "ENVIADA",
    orderProducts: [
      {
        productRef: "SUP002",
        quantity: 3
      }
    ]
  },
  {
    email: "customer3@example.com",
    password: "contrasena789",
    name: "Carlos Rodríguez",
    documentType: "Cédula ciudadania",
    documentNumber: 543216789,
    address: "Plaza XYZ, Pueblo Ejemplo",
    estimatedDeliveryDate: new Date("2023-10-22"),
    state: 'ENTREGADA',
    orderProducts: [
      {
        productRef: "SUP004",
        quantity: 1
      }
    ]
  }
]