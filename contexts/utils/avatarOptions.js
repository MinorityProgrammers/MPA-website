export const topType = ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairFrida", "ShortHairDreads01", "ShortHairFrizzle", "ShortHairTheCaesar", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairNotTooLong", "LongHairShavedSides"];
export const accessoriesType = ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"];
export const facialHairType = ["Blank", "BeardMedium", "BeardLight", "BeardMajestic", "MoustacheFancy", "MoustacheMagnum"];
export const clotheType = ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"];
export const clotheColor = ["Black", "Blue02", "Blue03", "Gray01", "Gray02", "PastelBlue", "PastelGreen", "PastelYellow", "PastelRed", "Pink", "Red"]; export const eyeType = ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Suprised", "Wink", "WinkWacky"];
export const eyebrowType = ["Angry", "AngryNatural", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"];
export const mouthType = ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle"];
export const skinColor = ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"];


const makeOptionList = (list) => {
    return list.map((element) => (
        { label: `${element}`, value: element }));
};

export const topTypeOptions = makeOptionList(topType);
export const accessoriesTypeOptions = makeOptionList(accessoriesType);
export const facialHairTypeOptions = makeOptionList(facialHairType);
export const clotheTypeOptions = makeOptionList(clotheType);
export const clotheColorOptions = makeOptionList(clotheColor);
export const eyeTypeOptions = makeOptionList(eyeType);
export const eyebrowTypeOptions = makeOptionList(eyebrowType);
export const mouthTypeOptions = makeOptionList(mouthType);
export const skinColorOptions = makeOptionList(skinColor);
