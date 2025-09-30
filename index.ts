import boot from "./src/app";
import {config} from 'dotenv'

function init() {
    config()
    boot()
}

init()
