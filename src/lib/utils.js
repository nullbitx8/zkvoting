/// encodeSignal has a limit of at max encoding 15 projects
/// because semaphor signals are input in a prime field where the max value is of 252 bits
/// we need 2 bytes to encode 1 project, hence we can do max 15
/// format: [project_id: 1 byte, amount: 1 byte, project_id: 1 byte, amount: 1 byte]
export const encodeSignal = (state) => {
    const project_ids = Object.keys(state);
    const signal = []
    project_ids.forEach((projectId)=>{

        let projectIdByte = int2Byte(projectId);

        let amount = state[projectId];
        let amountByte = int2Byte(amount);

        signal.push(projectIdByte)
        signal.push(amountByte)
    })

    const signalInt = parseInt(signal.join(""),2);
    return signalInt
}

const int2Byte = (number) => {
    const amount = parseInt(number);
    let bitValue = amount.toString(2);

    const padding = 8 - bitValue.length;
    let pad = "";

    for(let i=0; i < padding; i+=1){
        pad += "0"
    }

    bitValue = pad + bitValue;
    return bitValue
}
