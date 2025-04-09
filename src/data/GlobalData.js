export const GlobalState = {
    isDarkTheme: localStorage.getItem('theme') === 'true' ? true : false, // Maneja valores nulos
};



export const CubeTypes = [
    {id:0, name:'2x2', puzzleDisplay:'222'},
    {id:1, name:'3x3', puzzleDisplay:'333'},
    {id:2, name:'4x4', puzzleDisplay:'444'},
    {id:3, name:'5x5', puzzleDisplay:'555'},
    {id:4, name:'Skewb', puzzleDisplay:'skewb'},
    {id:5, name:'Pyraminx', puzzleDisplay:'pyram'},
    {id:6, name:'Megaminx', puzzleDisplay:'minx'},
    {id:7, name:'Square-1', puzzleDisplay:'sq1'},
]
export const SimpleCubicMoves = 
    ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2", "L", "L'", "L2", "B", "B'", "B2", "D", "D'", "D2"];

export const FourCubeMoves =[
    "U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2", "L", "L'", "L2", "B", "B'", "B2", "D", "D'", "D2",
    "Uw", "Uw'", "Uw2", "Rw", "Rw'", "Rw2", "Fw", "Fw'", "Fw2", "Lw", "Lw'", "Lw2", "Bw", "Bw'", "Bw2",
    "Dw", "Dw'", "Dw2"
]
export const FiveCubeMoves =[
    "U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2", "L", "L'", "L2", "B", "B'", "B2", "D", "D'", "D2",
    "Uw", "Uw'", "Uw2", "Rw", "Rw'", "Rw2", "Fw", "Fw'", "Fw2", "Lw", "Lw'", "Lw2", "Bw", "Bw'", "Bw2",
    "Dw", "Dw'", "Dw2",
    // 5x5 specific moves
    'M', 'M\'', 'M2', 'E', 'E\'', 'E2', 'S', 'S\'', 'S2'
]
export const SkewbMoves = [
    "U", "U'", "R", "R'", "L", "L'", "B", "B'",
]
export const PyraminxMoves = [
    "U", "U'", "L", "L'", "R", "R'", "B", "B'",
    // Pyraminx specific moves
    "u", "u'", "l", "l'", "r", "r'", "b", "b'",
]
export const MegaminxMoves = [
    "U", "U'", "R", "R'", "L", "L'", "B", "B'","F", "F'",
    // Megaminx specific moves
    
]
export const AllMoves = {
    0: SimpleCubicMoves,  // 2x2 o 3x3
    1: SimpleCubicMoves,  // 2x2 o 3x3
    2: FourCubeMoves,     // 4x4
    3: FiveCubeMoves,     // 5x5
    4: SkewbMoves,
    5: PyraminxMoves,
    6: MegaminxMoves
}