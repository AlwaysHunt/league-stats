import store from '../../store/index'

export function findChampion(championId)  {
	let championIndex = store.state.championList.findIndex(found => {
		return found.championKey == championId;
	});
	
	let champion = {
		championKey: store.state.championList[championIndex].championKey,
		championName: store.state.championList[championIndex].championName,
		championImage: store.state.championList[championIndex].championImage
	};
	return champion;
}