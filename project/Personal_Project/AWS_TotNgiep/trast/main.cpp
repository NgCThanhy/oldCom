
#include <iostream>

using namespace std;

void PrintArr(int arr[], int n){
    for(int i = 0; i < n; i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl;
}

void BubbleSort(int arr[], int n){ // đưa max xuống cuối
    int loopCounter = 0;
    int iright = n - 1;
    int temp = 0;
    
    
    for (; loopCounter < iright; loopCounter++) {
        for (int ileft = 0; ileft < n - loopCounter - 1; ileft++) {
            if (arr[ileft] > arr[ileft + 1]) {
               
                // Swap arr[j] and arr[j+1]
                temp = arr[ileft];
                arr[ileft] = arr[ileft + 1];
                arr[ileft + 1] = temp;
                
            }
        }
    }
}

void ShakerSort(int arr[], int n){ // đưa max xuống cuối và min lên đầu
    int ileft = 0;
    int iright = n - 1;
    int temp = 0;
    
    while (ileft < iright){
        for(int i = ileft; i < iright; i++){
            if (arr[i] > arr[i + 1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        iright--;
        
        for(int i = iright; i > ileft; i--){
            if (arr[i] < arr[i - 1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
            }
        }
        ileft++;
        
    }
}

void InsertSort(int arr[], int n){ // nhét vào arr đã sắp

    // arr[0] is a array already sort => start from arr[1]
    for (int iInserting = 1; iInserting < n; iInserting++) {
        int key = arr[iInserting];
        int iRightSortedArr = iInserting - 1;
        
        while (iRightSortedArr >= 0 && arr[iRightSortedArr] > key) {
            // iRightSortedArr + 1 = iInserting
            arr[iRightSortedArr + 1] = arr[iRightSortedArr];
            iRightSortedArr--;
        }
        
        arr[iRightSortedArr + 1] = key; // Insert
    }
    
    
    
}

int binarySearch(int arr[], int ileft, int iRight, int data){
    int iMid = (ileft+iRight) / 2;
    
    if (ileft > iRight) {
        cout<<"out of range"<<endl;
        cout<<"last index meet condition: "<<ileft<<endl;
        return ileft;
    }
    
    if( data < arr[iMid]){
        return binarySearch(arr, ileft, iMid -1, data);
    }
    else if (data > arr[iMid]){
        return binarySearch(arr, iMid +1, iRight, data);
    }
    else if (data == arr[iMid]){
        return iMid;
    }
}

void BiInsertSort(int arr[], int n){
    // arr[0] is a array already sort => start from arr[1]
    for (int iInserting = 1; iInserting < n; iInserting++) {
        int key = arr[iInserting];
        int iRightSortedArr = iInserting - 1;
        
        int iLocaion = binarySearch(arr, 0, iRightSortedArr, key);
        
        for(int i = iRightSortedArr; i >= iLocaion; i--){
            arr[i + 1] = arr[i];
        }
        
        arr[iLocaion] = key; // Insert
    }
    
    
    // for (int iInserting = 1; iInserting < n; iInserting++) {
    //     int key = arr[iInserting];
    //     int iRightSortedArr = iInserting - 1;

    //     int insertPos = binarySearch(arr, 0, iRightSortedArr, key);

    //     while (iRightSortedArr >= insertPos) {
    //         arr[iRightSortedArr + 1] = arr[iRightSortedArr];
    //         iRightSortedArr--;
    //     }

    //     arr[iRightSortedArr + 1] = key;
    // }
    
    
}

void ShellSort(int arr[], int n){
    // init h value
    int h = 1;
    while(h < n){
        h = h * 3 + 1;
    }

    while (h > 0) {
        // Perform insertion sort on subarrays defined by the gap
        for (int i = h; i < n; i++) {
            int temp = arr[i];
            int j = i;

            // Shift elements in the subarray towards right
            while (j >= h && arr[j - h] > temp) {
                arr[j] = arr[j - h]; // switch 2 item with in h 
                j -= h;
            }

            arr[j] = temp;
        }

        // Reduce the gap
        h = (h - 1) / 3;
    }
    
    // for (int gap = n / 2; gap > 0; gap /= 2) {
    //     // Perform insertion sort on subarrays defined by the gap
    //     for (int i = gap; i < n; i++) {
    //         int temp = arr[i];
    //         int j = i;

    //         // Shift elements in the subarray towards right
    //         while (j >= gap && arr[j - gap] > temp) {
    //             arr[j] = arr[j - gap];
    //             j -= gap;
    //         }

    //         arr[j] = temp;
    //     }
    // }
    
    
}

void QuickSort(int arr[], int left, int right){ 
		int pivot = (left+right)/2;
		int l = left, r = right;

		while(l < r){
			while (arr[l] < arr[pivot]){ //find smaller than pivot 
				l++;
			}
			while (arr[r] > arr[pivot]){ //find biger than pivot
				r--;
			}
			if (l <= r){
				swap(arr[l],arr[r]); //swap both of them
				 
				l++;
				r--;
			}
		}
		
		if (left < r){
			QuickSort(arr, left, r);
		}
		if (l < right){
			QuickSort(arr, l, right);
		}
	}

// Hàm merge dùng để trộn hai mảng con thành một mảng
// arr: mảng đầu vào
// left: chỉ số bắt đầu của mảng con đầu tiên
// mid: chỉ số kết thúc của mảng con đầu tiên và bắt đầu của mảng con thứ hai
// right: chỉ số kết thúc của mảng con thứ hai
void merge(int arr[], int left, int mid, int right){
    int subArr1 = mid - left + 1; // Độ dài của mảng con đầu tiên
    int subArr2 = right - mid; // Độ dài của mảng con thứ hai

    // Tạo hai mảng tạm
    int *leftArr = new int[subArr1];
    int *rightArr = new int[subArr2];
    int iSubArr1 = 0, iSubArr2 = 0;
    int iMergedArr = left;

    // Sao chép các phần tử vào hai mảng tạm
    for (int i = 0; i < subArr1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < subArr2; j++)
        rightArr[j] = arr[mid + 1 + j];

    // Trộn các mảng tạm lại thành mảng arr[left..right]
    while (iSubArr1 < subArr1 && iSubArr2 < subArr2) {
        if (leftArr[iSubArr1] <= rightArr[iSubArr2]) {
            arr[iMergedArr] = leftArr[iSubArr1];
            iSubArr1++;
        }
        else {
            arr[iMergedArr] = rightArr[iSubArr2];
            iSubArr2++;
        }
        iMergedArr++;
    }

    // Sao chép phần còn lại của mảng con đầu tiên (nếu có)
    while (iSubArr1 < subArr1) {
        arr[iMergedArr] = leftArr[iSubArr1];
        iSubArr1++;
        iMergedArr++;
    }

    // Sao chép phần còn lại của mảng con thứ hai (nếu có)
    while (iSubArr2 < subArr2) {
        arr[iMergedArr] = rightArr[iSubArr2];
        iSubArr2++;
        iMergedArr++;
    }

    // Ghi nhớ giải phóng bộ nhớ
    delete[] leftArr;
    delete[] rightArr;
}

// Hàm mergeSort dùng để sắp xếp một mảng sử dụng merge sort
// arr: mảng đầu vào
// begin: chỉ số bắt đầu của mảng con đang được sắp xếp
// end: chỉ số kết thúc của mảng con đang được sắp xếp
void mergeSort(int arr[], int begin, int end){
    if (begin >= end)
        return;

    int mid = begin + (end - begin) / 2;
    mergeSort(arr, begin, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, begin, mid, end);
}


/*
Thuật toán bắt đầu bằng việc xây dựng một heap từ mảng đầu vào.
lần lượt swap phần tử đầu (gốc của heap) vs phần tử cuối cùng chưa được sắp xếp 
và tái xây dựng heap sau mỗi lần đổi chỗ.
*/

// Hàm heapify dùng để tạo một heap từ một mảng
// arr: mảng đầu vào
// N: số lượng phần tử của mảng
// i: chỉ số của nút gốc của cây con
void heapify(int arr[], int N, int i){
    int largest = i; // Giả sử nút gốc là lớn nhất
    int l = 2 * i + 1; // Chỉ số của nút con trái
    int r = 2 * i + 2; // Chỉ số của nút con phải

    // So sánh nút con trái với nút gốc và cập nhật largest nếu nút con lớn hơn
    if (l < N && arr[l] > arr[largest])
        largest = l;

    // So sánh nút con phải với nút gốc và cập nhật largest nếu nút con lớn hơn
    if (r < N && arr[r] > arr[largest])
        largest = r;

    // Nếu largest không phải là nút gốc, đổi chỗ nút gốc và nút largest
    // sau đó gọi đệ quy heapify trên cây con tiếp theo
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, N, largest);
    }
}

// Hàm heapSort dùng để sắp xếp một mảng sử dụng heap sort
// arr: mảng đầu vào
// N: số lượng phần tử của mảng
void heapSort(int arr[], int N){
    // Xây dựng heap từ mảng
    for (int i = N / 2 - 1; i >= 0; i--)
        heapify(arr, N, i);

    // Lần lượt đổi chỗ phần tử đầu (gốc của heap) với phần tử cuối cùng chưa được sắp xếp
    // và gọi heapify để tái xây dựng heap sau mỗi lần đổi chỗ
    for (int i = N - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

////////////////////////////////////////////////////////////

// Binary Tree Node
struct Node {
    int data;
    int height; // use for AVL
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        height = 1;
        left = nullptr;
        right = nullptr;
    }
};

// Function to insert an element into the binary tree
void insert(Node* root, int value) {
    if (value < root->data) {
        if (root->left == nullptr) {
            root->left = new Node(value);
        } else {
            insert(root->left, value);
        }
    } else {
        if (root->right == nullptr) {
            root->right = new Node(value);
        } else {
            insert(root->right, value);
        }
    }
}

// Function to build a binary tree from an array
Node* buildBinaryTree(int arr[], int size) {
    Node* root = new Node(arr[0]);

    for (int i = 1; i < size; i++) {
        insert(root, arr[i]);
    }

    return root;
}

void inorderLNR(Node* root) {
    if (root == nullptr) {
        return;
    }

    inorderLNR(root->left);
    cout << root->data << " ";
    inorderLNR(root->right);
}

void inorderNLR(Node* root) {
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    inorderNLR(root->left);
    inorderNLR(root->right);
}

void inorderLRN(Node* root) {
    if (root == nullptr) {
        return;
    }

    inorderLRN(root->left);
    inorderLRN(root->right);
    cout << root->data << " ";
}

void printNodesWithOneSubnode(Node* root) {
    if (root == nullptr) {
        return;
    }

    int childCount = 0;
    if (root->left != nullptr) {
        childCount++;
    }
    if (root->right != nullptr) {
        childCount++;
    }

    if (childCount == 1) {
        std::cout << root->data << " ";
    }

    printNodesWithOneSubnode(root->left);
    printNodesWithOneSubnode(root->right);
}

void printNodesWithOneSubnodeRight(Node* root) {
    if (root == nullptr) {
        return;
    }

    if (root->left == nullptr && root->right != nullptr && root->right->left == nullptr && root->right->right == nullptr) {
        std::cout << root->data << " ";
    }

    printNodesWithOneSubnode(root->left);
    printNodesWithOneSubnode(root->right);
}



///////////////////////////
// AVL

int getHeight(Node* node) {
    if (node == nullptr) {
        return 0;
    }
    return node->height;
}

void updateHeight(Node* node) {
    int leftHeight = getHeight(node->left);
    int rightHeight = getHeight(node->right);
    node->height = 1 + std::max(leftHeight, rightHeight);
}

// Function to perform a right rotation
Node* rotateRight(Node* node) {
    Node* newRoot = node->left;
    node->left = newRoot->right;
    newRoot->right = node;

    updateHeight(node);
    updateHeight(newRoot);

    return newRoot;
}

// Function to perform a left rotation
Node* rotateLeft(Node* node) {
    Node* newRoot = node->right;
    node->right = newRoot->left;
    newRoot->left = node;

    updateHeight(node);
    updateHeight(newRoot);

    return newRoot;
}

// Function to balance the AVL tree
Node* balance(Node* node) {
    updateHeight(node);

    int balanceFactor = getHeight(node->left) - getHeight(node->right);

    // Left-Left case
    if (balanceFactor > 1 && node->left != nullptr && getHeight(node->left->left) >= getHeight(node->left->right)) {
        return rotateRight(node);
    }

    // Right-Right case
    if (balanceFactor < -1 && node->right != nullptr && getHeight(node->right->right) >= getHeight(node->right->left)) {
        return rotateLeft(node);
    }

    // Left-Right case
    if (balanceFactor > 1 && node->left != nullptr && getHeight(node->left->left) < getHeight(node->left->right)) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }

    // Right-Left case
    if (balanceFactor < -1 && node->right != nullptr && getHeight(node->right->right) < getHeight(node->right->left)) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }

    return node; // No imbalance, return the same node
}

// Function to insert an element into the AVL tree
Node* insertAVL(Node* root, int value) {
    if (root == nullptr) {
        return new Node(value);
    }

    if (value < root->data) {
        root->left = insertAVL(root->left, value);
    } else {
        root->right = insertAVL(root->right, value);
    }

    return balance(root);
}

// Function to build an AVL tree from an array
Node* buildAVLTree(int arr[], int size) {
    Node* root = nullptr;

    for (int i = 0; i < size; i++) {
        root = insertAVL(root, arr[i]);
    }

    return root;
}

void printTreeAVL(Node* root, std::string prefix = "", bool isLeft = true) {
    if (root == nullptr) {
        return;
    }

    if (root->right != nullptr) {
        printTreeAVL(root->right, prefix + (isLeft ? "│   " : "    "), false);
    }

    std::cout << prefix;
    std::cout << (isLeft ? "└── " : "┌── ");
    std::cout << root->data << std::endl;

    if (root->left != nullptr) {
        printTreeAVL(root->left, prefix + (isLeft ? "    " : "│   "), true);
    }
}

int main()
{
    int arr[] = {1,9,2,8,3,7,6,5,10,0};
    heapSort(arr, 10);
    PrintArr(arr,10);
 ////////////////////////////
 
    // Build binary tree
    Node* root = buildBinaryTree(arr, 10);
    
    Node* rootAVL = buildAVLTree(arr, 10);

    // Print binary tree
    cout << "Inorder Traversal: ";
    inorderLNR(root);
    cout << endl;
    cout << "Preorder Traversal: ";
    inorderNLR(root);
    cout << endl;
    cout << "Postorder Traversal: ";
    inorderLRN(root);
    cout << endl;
    printNodesWithOneSubnode(root);
    cout << endl;
    printNodesWithOneSubnodeRight(root);
    cout << endl;
    printTreeAVL(rootAVL);
    
    return 0;
}