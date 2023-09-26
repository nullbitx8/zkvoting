import { SemaphoreSubgraph } from "@semaphore-protocol/data"


const Semaphore = async () => {
    const semaphoreSubgraph = new SemaphoreSubgraph()

    console.log(semaphoreSubgraph)

    const groupIds = await semaphoreSubgraph.getGroupIds()
    console.log(groupIds);

    const groups = await semaphoreSubgraph.getGroups()
    console.log(groups);

}

export default Semaphore;
