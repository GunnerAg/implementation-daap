export default {
  /**
   * PORT DEFAULT
   */
  PORT: process.env.PORT || 8080,
  HOST: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',

  /**
   * JWT CONFIG
   */
  JWT_SECRECT: 'JWT_SECRECT_MANDANGA@',
  JWT_ALGORITHM: 'HS256',

  /**
   * DATABASE CONFIG
   */
  DATABASE: {
    host: 'localhost',
    post: '3306',
    user: 'root',
    password: 'root',
    database: 'market'
  },

  /**
   * API CONFIG
   */
  API: {
    PREFIX: '/api'
  },

  /**
   * API KEY
   */

  API_KEY: '9b8c61ec-1818-4647-b038-bd2676c522b7',

  /**
   * MAIL
   */
  MAIL: {
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: 'changetheblock@gmail.com',
      pass: 'pzaittepyjkyxryt'
    }
  },

  /**
   * Madrid holidays
   */
  HOLIDAY_API: 'https://datos.comunidad.madrid/catalogo/api/3/action/datastore_search?resource_id=2f38a998-b000-436e-aecd-2e87f4e4eb84',

  /**
   * Document path
   */

  DOCUMENT_PATH: './src/uploads/documents',

  FRONT_URL: process.env.CORS_ORIGIN || 'http://localhost:3000',

  DEV_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '',

  CLOUD_FOLDERS: {
    EMPLOYEE: 'employees'
  },

  CLOUDINARY: {
    cloud_name: 'ddk8adwxa',
    api_key: '958478495788836',
    api_secret: 'blnLSStAGbbqUqHdh2EK3Nv9muE'
  }
}
