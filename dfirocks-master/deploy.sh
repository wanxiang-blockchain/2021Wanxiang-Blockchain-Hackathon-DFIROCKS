dfx build --network ic
dfx canister --network ic install frontend
dfx canister --network ic install drocks --argument "(principal \"$(dfx identity get-principal)\")"
