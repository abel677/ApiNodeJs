import express from "express"
import morgan from "morgan"
import cors from 'cors'

import { authRoute} from './src/routes/index.routes.js'
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(cors())

app.use('/api', authRoute)

export default app;