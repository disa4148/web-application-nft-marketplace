import css from './selectBank.module.scss'
import Bank from "@/shared/ui/bank/bank";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";


export default function SelectBank () {
    return (
        <div className={css.wrapper}>
            <Bank />
            <div className={css.sending}>
                <Input className={css.input}/>
                <Button className={css.button}>Пополнить</Button>
            </div>
        </div>
    )
}
