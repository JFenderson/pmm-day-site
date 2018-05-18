import { Router } from 'express';
import { charge } from '../utils/stripeCharge'

let router = Router();

router.post('/', (req, res) => {
    let tokenId = req.body.stripeToken;
    let amount = req.body.token.amount;
    let email = req.body.stripeEmail;

    charge(tokenId, amount, email)
        .then((success) => {
            res.status(200).json({ message: 'success'});
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

export default router;