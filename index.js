class SimpleNameMatcher {
  constructor() {
		this.changeInDiacriticWeight = 0.1;
		this.halfSeparationWeight = 0.3;
		this.fullSeparationWeight = 0.5;
		this.changeInLetterWeight = 1.2;

		this.nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\u00C0-\u017F\s\-.´,‘’]*$/;
  }

  compareNames(name1, name2) {
		if (!this.nameRegex.test(name1) || !this.nameRegex.test(name2)) {
			throw new Error('NonPermittedSymbolException');
		}

		name1 = this.cleanName(name1);
		name2 = this.cleanName(name2);

		const name1WithoutSeparators = this.removeSeparators(name1);
		const name2WithoutSeparators = this.removeSeparators(name2);

		const biggerName = name1WithoutSeparators.length >= name2WithoutSeparators.length ? name1 : name2;
		const smallerName = name1WithoutSeparators.length >= name2WithoutSeparators.length ? name2 : name1;

		const impactFactor = (1.0 / Math.max(name1WithoutSeparators.length, name2WithoutSeparators.length)) * 100;
		const differenceOfLength = biggerName.length - smallerName.length;

		if (100 - differenceOfLength * impactFactor * this.changeInLetterWeight < 0) {
			return 0;
		}

		const dp = Array.from({ length: smallerName.length + 1 }, () => Array(biggerName.length + 1).fill(0));

		for (let i = 0; i <= smallerName.length; i++) {
			for (let j = 0; j <= biggerName.length; j++) {
				if (i === 0) {
					dp[i][j] = j * impactFactor * this.changeInLetterWeight;
				} else if (j === 0) {
					dp[i][j] = i * impactFactor * this.changeInLetterWeight;
				} else {
					const cost = this.getCost(biggerName[j - 1], smallerName[i - 1]);
					dp[i][j] = Math.min(
						dp[i - 1][j] + impactFactor * this.changeInLetterWeight,
						dp[i][j - 1] + impactFactor * this.changeInLetterWeight,
						dp[i - 1][j - 1] + cost
					);
				}
			}
		}

		const score = 100 - dp[smallerName.length][biggerName.length];
		return score < 0 ? 0 : score;
  }

  cleanName(name) {
		return name.trim().toLowerCase();
  }

  removeSeparators(name) {
		return name.replace(/[\s\-.´,‘’]/g, '');
  }

  removeDiacritics(char) {
		return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  getCost(char1, char2) {
		const char1Plain = this.removeDiacritics(char1);
		const char2Plain = this.removeDiacritics(char2);

		if (char1Plain === char2Plain) {
			if (char1 === char2) {
				return 0; // Exact match
			}
			return this.changeInDiacriticWeight; // Match with different diacritics
		}
		return this.changeInLetterWeight; // Different letters
	}
}

module.exports = { SimpleNameMatcher };
