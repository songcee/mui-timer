function hasTime (time) {
	if (time === undefined || time === null || time === '' || time === '0000-00-00 00:00:00') {
		return false;
	}
	return true;
}