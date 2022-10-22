# Solidity Stater

- Solidity
    - Security smartcontract
        - [backdoor](https://cryptonews.com/exclusives/are-you-sure-there-is-no-backdoor-to-your-coins-2415.htm) : backdoor trong code của SC
        - Reentrancy:
    - ERC20 chuẩn chung về tokens
    - Các chương trình được dev trên solidity sẽ được chạy trên nền EVM
        - EVM được mô tả như một máy tính ảo trên blockchain, biến Sol code thành các ứng dụng chạy trên nền Ethereum
    - Kiểu dữ liệu **`static type`**
        - Khi không gán giá trị cho variable → sẽ có giá trị mặc định ⇒ không có `null` và `undefined`
            - uint = 0
            - bool = false
            - String = “”
        - (u)int : (Unsigned) Integer
            - uint: 8 - 255
            - int8: -128 → +127
            - uint256 ⇒ 2^256
        - string
            - không có các `manipulation` functions : .length(), add() ….
            - không có string `comparison`
            - EVM có 3 nơi để lưu trữ
                - Storage: Mỗi contract sẽ có 1 bộ nhớ riêng, bộ nhớ không đổi ở mỗi lần call function. Do đó nó t`ốn chi phí rất nhiều khi sử dụng`
                - Memory: nơi lưu trữ các dữ liệu tạm thời, thường được sử dụng trong các tham số và sử dụng external của hàm. Do đó, nó sẽ bị xóa đi sau khi kết thúc hàm nên chi phí sử dụng sẽ `ít hơn`
                - Stack: nơi lữu trữ các biến local, nhỏ
        - boolean
        - address
            - 1 address chiếm 20 byte
            - address và address payable khác nhau
            - có 2 thành phần quan trọng
                - .balance
                - transfer(amount)
        - string và bytes
            - cả 2 đều là array
            - String `k get` đc length và index-access
            - Bytes: dữ liệu thô và cô độ dài tùy ý
            - hạn chế dùng `String` : có độ dài tùy ý và gồm các chuỗi UTF-8
            - dùng `memory` để cache tham số tạm thời
            - Note:
                - Không có giá trị   `null` và `undefined`
                - Không đc phép function = name với variable
                - không gán giá trị dạng `phủ định` cho kiểu `boolean`
                - Với các biến được khai báo với kiểu `public` khi compile sẽ tự động tạo 1 getter function cho biến đó
    - Advanced type
        - Mapping
            - Giống `hash maps`
            - mapping(keyType → valueType) name;
            - value khởi tạo mặc định → ko có length
            - public state của mapping → getter
            - iterable mapping thực hiện cần dùng lib
            - 
            
            ```solidity
            pragma solidity ^0.5.13;
            
            contract MappingStructExample {
            
                mapping(address => uint) public balanaceReceived;
               
               function getBalance() public view returns(uint) {
                   return address(this).balance;
               }
            
               function sendMoney() public payable {
                   balanaceReceived[msg.sender] += msg.value;
               }
            
               function withDrawMoneyTo(address payable _to) public {
                   _to.transfer(getBalance());
               }
            
               function withDrawMoney(address payable _to, uint _amount) public {
            /// check condition when handle transactions
                   require(balanaceReceived[msg.sender] >= _amount, "Amount not enought !");
                   balanaceReceived[msg.sender] -= _amount;
                   _to.transfer(_amount);
               }
            }
            ```
            
            ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled.png)
            
        - Struct
            - `struct` tố hơn `object` khi muốn tối ưu phí gas
        - Array
            - hỗ trợ dynamic size and fixed như js
            - có length và push
            - arrays tốn nhiều phí gas cost → sử dụng mapping
        - Enum
        - Mapping + Struct : kết hợp
    - Nơi lưu dữ liệu : ****Storage vs Memory (Data location)****
        - storage: bộ nhớ không đổi ở mỗi lần call → tốn phí gas
        - memory: lưu tham số, sau khi dùng thì được xóa khỏi bộ nhớ của hàm
        - stack: lưu các biến local, nhỏ
    - EOA & Contract Account
        
        ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%201.png)
        
    - Global Objects
        - Có thể biết được Transaction từ đâu đến và chuyện j xảy ra trong smart contract
        - 3 thuộc tính quan trọng
            - msg.sender: `Address` của `account` khởi tạo `transaction`
            - msg.value: số lượng `ether` chuyển vào
            - now: timestamp hiện tại
            
    - **Payable function address**
        - Function cần được đánh dấu `payable` thì mới có thể nhận `ethers`
        - Example
            - address payable myAddress
            - function myFn() public payable {}
    - ****Error & Exception trong Solidity****
        - Xảy ra lỗi  khi thực hiện transaction thì chương trình sẽ tự động `state reverting`
        - Assert : validate invariants
            - `sum` vượt qua mức cho phép ..
        - Require: validate user input
    - Function : ****Visibility | Constructor | Fallback****
        - view function: read state only và gọi các function khác
        - Pure function: không cho phép `read` cũng như `modify state`   ( tên cũ constant ) có thể tương tác với `pure` function khác
        - Function visibility
            - public: call every where
            - private : chỉ call trong contract
            - external : có thể gọi contract khác và từ bên ngoài
            - internal: chỉ call trong contract only hoặc từ `derived contract`
        - Constructor chỉ được gọi 1 lần khi deploy contract
        - Fallback Function ~ express function js
            - Được gọi khi thực hiện `transaction`  → không có fallback function → lỗi exception.
    - ****More on Function Visibility****
        - Function được create private → khi kế thừa contract không thể gọi
        - ****Internal and External ~~ private and public****
        - `Internal` giống như `private` ngoại trừ việc cho phép `SC` khác gọi khi được inherit ********
    - Modifier function
        - Example reuse condition check owner `onlyOwner`
        
        ```solidity
        contract Owner {
            address owner;
        
            constructor() public {
                owner = msg.sender;
            }
        
            modifier onlyOwner() {
                require(msg.sender == owner, "You are not allowed");
        	// syntax block code run sau {}
                _;
            }
        }
        
        contract InheritModifierExample  is Owner{
            mapping(address => uint256) public tokenBalance;
           
            uint tokenPrice = 1 ether;
        
            constructor() public {
                owner = msg.sender;
                tokenBalance[owner] = 100;
            }
        
            function createNewToken() public onlyOwner{
                tokenBalance[owner]++;
            }
        
            function purchaseToken() public payable {
                require((tokenBalance[owner] * tokenPrice) / msg.value > 0, "not enough token");
                tokenBalance[owner] -= msg.value / tokenPrice;
                tokenBalance[msg.sender] += msg.value / tokenPrice;
            }
        
            function burnToken() public onlyOwner{
                tokenBalance[owner]--;
            }
        
             function sendToken(address _to, uint _amount) public {
               require(tokenBalance[msg.sender] >= _amount, "Not enough token");
        
               assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
        
                assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);
                tokenBalance[msg.sender] -= _amount;
                tokenBalance[_to] += _amount;
            }
        }
        ```
        
    - Inheritance
        - multiple inheritance
        - use `super` để truy cập `base contract`
    - Extends
        - Dù kế thừa bao nhiêu contract thì build → only 1 contract duy nhất
    - Event
        - Khi tạo 1 `event` cần `emit`
        - Emit ra bên ngoài khi dùng backend có thể listen được để biết contract đang làm gì khi method được gọi
        - Event and return value
            - EVM hỗ trợ logging mọi thứ diễn ra trong SC
                - Trả về các giá trị trong `transaction`
                - Bên ngoài lắng nghe event khi được trigger
                - sử dụng ít data storage hơn
            - Hàm Writing transaction k trả về giá trị
        - Trong Dapps
            - Application có thể `subscribe  & listen` các `Event` thông qua `RPC` interface của Ethereum client
            - Các tham số data trả về được đánh dấu `indexed` phục vụ việc tìm kiếm
    - ABI & Debugging
        
        ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%202.png)
        
        - FUNCTIONHASHES
            - mã hóa các name function
        - Interaction : tương tác
            - Tương tác `low level` các `data fields`
            - Client sử dụng `ABI` Application Binary Interface
            - Abi chứa functions, parameters, return values của contract
    - Library
        - sử dụng key word `library`
        - Toàn bộ method và thuộc tính được Ethereum reuse thông qua `[DELEGATECALL](https://www.notion.so/Solidity-Stater-2be162ae792945369b13d36e657da635)` feature
        - Limitation
            - không có storage nào, không chứa được các biến lưu state ..
            - không hold ethers : k có payable
            - không kế thừa
        - Deploy
            - Embedded Library: chỉ chứa các `internal` function EVM sẽ tự embed khi deploy contract
            - Linked Library: library sử dụng `internal` và `external` function thì lúc này cần deploy lên blockchain
    - Naming convention
        - private function start with an underscore ( _ )
    - ****Delegate call Function****
        - low level function trong solidity
        - Contract A `delegate call` đến contract B
        - Call
            - Call function
                
                ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%203.png)
                
                ```solidity
                // SPDX-License-Identifier: GPL-3.0
                
                pragma solidity >=0.7.0 <0.9.0;
                
                contract B {
                    uint public num;
                    address public sender;
                    uint public value;
                
                    function setNewValue(uint _newNum) public payable {
                        num = _newNum;
                        sender = msg.sender;
                        value = msg.value;
                    }
                }
                
                contract B2 {
                    uint public num;
                    address public sender;
                    uint public value;
                
                    function setNewValue(uint _newNum) public payable {
                        num = _newNum * 2;
                        sender = msg.sender;
                        value = msg.value;
                    }
                }
                
                contract A {
                    uint public num;
                    address public sender;
                    uint public value;
                
                    function setNewValue(address _contract, uint _newNum) public payable {
                        // uint = uint256
                        B(_contract).setNewValue(_newNum);
                        sender = msg.sender;
                        value = msg.value;
                    }
                }
                ```
                
            - delagate call functions :
                - Lấy context của `contract A` để thực hiện
                    
                    ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%204.png)
                    
            
            ```solidity
            // SPDX-License-Identifier: GPL-3.0
            
            pragma solidity >=0.7.0 <0.9.0;
            
            contract B {
                uint public num;
                address public sender;
                uint public value;
            
                function setNewValue(uint _newNum) public payable {
                    num = _newNum;
                    sender = msg.sender;
                    value = msg.value;
                }
            }
            
            contract B2 {
                uint public num;
                address public sender;
                uint public value;
            
                function setNewValue(uint _newNum) public payable {
                    num = _newNum * 2;
                    sender = msg.sender;
                    value = msg.value;
                }
            }
            
            contract A {
                uint public num;
                address public sender;
                uint public value;
            
                function setNewValue(address _contract, uint _newNum) public payable {
                    // uint = uint256
                    (bool success, bytes memory result) = _contract.delegatecall(
                        abi.encodeWithSignature("setNewValue(uint256)", _newNum)
                    );
            
                    require(success, "Transaction failed");
                }
            }
            ```
            
        - Ứng dụng:
            - upgradeable Contract
                
                ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%205.png)
                
    - Security
        - modifier vs reentrancy
            
            
    - Note:
        - `ethers` không lưu trữ trên ví mà lưu trữ trên block chain ( xem được balance và transfer )
        - Nhập giá trị thì hàm không cần `return` và ngược lại
- Web3
    - Blockchain là gì ?
        - đối với người dùng: là một `sổ cái` phi tập trung, ai cũng có thể sở hữu và lưu trữ giống hệt nhau
        - đối với dev : như 1 `database` gồm nhiều `node`
        - Sổ cái ( ledger ) : định nghĩa trong tài chính, lưu trữ tất các `transaction`
        - Bitcoin
        - Giữa các khôi có mối liên kết với nhau . block tiếp theo sử dụng previous hash của block trước → vì vậy nếu muốn thay đổi 1 block thì phải thay đổi các block trước đó hoặc sau đó …
        
    - Cơ chế Proof of Work ( PoW )
        - Miner: thợ đào kiếm thưởng từ việc giúp hệ thống tạo block và xác thực block
        - Với Pow các miner cần sức mạnh của máy tính để hashing liên tục
    - Wallet
        - chứa crypto currencies
        - address(public) | private key
        - Mỗi chain có 1 ví riêng
    - Mnemonic
        - random một dãy Mnemonic BIP39
        - [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/)
    - Ethereum - smart contract
        - SC: cũng giống 1 account user
        - chứa tài sản, address, transaction, transfer ...
        - `Nhưng` không được sửa đổi
        - 
    - Token & coin
        - ETH : native token ( ethereum chain )
        - token ERC20
    - Dapp & web3
        - Để app thao tác được với blockchain sẽ cần provider `web3` . Đây là 1 plugin js được embed vào browers
            - Provider ( thường là wallet ) sẽ quản lí `private key` và `sign` các transaction khi có yêu cầu.
            - App có dùng `web3 provider` sẽ được gọi là Dapp → decentralized app
    - Vấn đề của Dapp
        - Dapp lúc này chạy trên `ethereum` chain nên phí giao dịch cao, tgian duyệt transaction chậm
        - Không tháo tác với block chain ( off- chain) Quá trình này chiếm 90% dự án → k phải Dapp nào cũng minh bạch
        - Các logic và nghiệp vụ của một dự án rất nhiều → nếu dùng all đều là block chain thì dẫn đến việc tốn rất nhiều phí gas và `SC` k thể thay đổi
        - ERC20 chỉ mang tính chất đầu cơ và gọi vốn
    
    - Defi
        - tài chính phi tập trung
        - minh bạch, phi ủy thác
        - stablecoins: dùng tài sản thế chấp → v2 ( dùng token thế chấp )
        - lending/borrowing: người vay cung cấp thanh khoản bên cho vay. lãi suất được tính trong smart contract
        - Decentralized Exchange ( DEX ) : sàn giao dịch `phi tập trung`, khác với sàn tập trung ( `CEX` ) `DEX` → ẩn danh
        - Liquidity mining: gửi tiền tiết kiệm nhận lãi
        
    - Defi Ex: Thanh khoản cho app phát hành token
        
        ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%206.png)
        
        - IDO ( initial DEX offering ) : Mở bán token phi tập trung phải tạo các cặp tokens ( Liquidity pool )
        - LP : một smart contract để quản lí tỉ giá cũng như các lệnh chuyển đổi giữa 2 loại token
        - Các sàn DEX chỉ cần list cặp BNB/Mytoken là lúc này user có thể mua được
        - Cung cấp thanh khoản cho app phát hành token
        - Thay vì chỉ hold giả sử `BNB` → add liquidity → lấy lợi nhuận: Yield Farming
    - Cách tính tỉ giá của sàn DEX
        
        ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%207.png)
        
        [https://docs.liquidswap.com/protocol-overview](https://docs.liquidswap.com/protocol-overview)
        
    - Ecosystem Defi
        - `Layer 1` ( blockchain platform)
        - `Layer 2` ( Liquidity, protocol … )
        - `Layer 3` ( applications, game, wallet )
    
    - TVL: total value locked
        - Có thể hiểu nó là `sự thu hút dòng tiền` của một chain, protocol , dự án
        - Chain nào có `TVL` càng cao, tốc độ tăng trưởng phản ánh qua `TVL`
        - Nếu giá token tăng mà TVL không tăng → chỉ là đợt thổi giá tạm thời
    - NFT: Non-fungible Token ( ERC-721 )
        - Bản chất vẫn là 1 token chuẩn `ERC-721`
        - Token thường `ERC 20`
        - `NFT` trong lập trình thì chính là 1 `class` trong `OOP` . Một token là một `instance` của nó
    - GameFI
        - C2E ( Create to Earn ) sáng tạo
        - P2E
    
    - Tokenomic
        - Là yếu tố kinh tế, cách một token được sử dụng, tổng cung, cung lưu thông, phân bổ và lịch giải ngân
        - Token có nhiều loại: Coin ( native ) , Tiện ích ( utility), điều hành ( governance ), Staking, Farming, Social/Fan ….
    
    # Dapp
    
    - Thành phần
        - Smart contract: ghi lại những sự kiện, hành động đảm bảo tính xác thực trên blockchain
        - Front End
        - BackEnd
    - Hardhat
        - Hỗ trợ mạng local hardhat giúp cho việc debug ở local
        
    - Knowledge
        - Cryptography
        - Blockchain network
        - public blockchain & permissioned blockchain
        - Consensus
        - SC
        - Transaction & block structure
        - Wallet
    - Lộ trình ether
        - IPFS
        - các loại token EIP
        - openzeppelin contracts
    - Một dự án NFT có gì
        - Phần quản trị
        - trao đổi buôn bán
        - dịch vụ tài chính: staking ...
        - giá trị cốt lõi
            
            
    - Các loại token
        - Native Token ( coin )
        - Token ( ERC 20 )
        - Token NFT ( ERC 721, ERC 115 )
    - EIP - EIP20
        
        
    - ERC20 - BEP20
        - Fungible tokens
        - BEP20
            - decimals: vì kiểu `uint` không lưu được số thập phân nên cần decimals để thực hiện tính toán chính xác hơn
            - transferFrom : cần `approve`
            - allowance : check đang được `approve` với `_spender` là bao nhiêu
        - Event
            - Must trigger event `Transfer` , `Approval`
    - Web3js
        - Web3 connect `RPC  | IPC | WS`
        - 1 Thư viện javascrip
        - Cầu nối `giao tiếp` giữa FE và Ethereum Blockchain
        - Một số chức năng tiêu biểu: tạo account, thực hiện tx …
- QIT Quick start
    - Blockchain là gì ?
        - Điểm đặc biệt của blockchain
            - Immutability
            - Decentralization
                - Nhờ vào `consensus mechanism` đảm bảo không ai được phép ghi một transaction không hợp lệ lên `Block`
            
    - BTC and ETH
        - BTC
            - 21 triệu token
            - POW
            - bitcoin scripting
        - ETH
            - Khái niệm mới: EVM ( Ethereum Virtual Machine )
            - SmartContract : mô phỏng lại 1 vài business nhỏ khác nhau  ( Vitalik Buterin + Charles Hoskinson )
    - **Cryptographic hash: Thuật toán băm trên blockchain**
        - một fingerprint, dùng để xác định một giao dịch
        - Sinh ra hash dùng thuật toán `Keccak256`
    - Wallet là gì
        - HD wallet : hyper deterministic wallet
            - một wallet có thể tạo ra nhiều địa chỉ ví
        - Private key
            
            ![Untitled](Solidity%20Stater%202be162ae792945369b13d36e657da635/Untitled%208.png)
            
        - Các loại address
            - EOA : **`Externally Owned Account`**
            - Contract address
    - Transactions
        - Gửi / nhận
        - Deploy smartcontract lên blockchain
        - Gọi hàm smc → post
        
    - Life cycle tx
        1. Build 1 tx gồm các field data
        2. Dùng private key để sign tx
        3. Send tx lên blockchain
        4. Chờ verify (validator node, miner node )
        
        → TX được ghi lên blockchain → nhận được một `transaction receipt`
        
    - Smart Contract nguyên lí
        - 1 ứng dụng nhỏ chạy trên blockchain thông qua `EVM`
        
        | Điểm mạnh | Điểm yếu |
        | --- | --- |
        | Immutable | Mắc - vì phải trả tiền gas |
        | Không bị ai quản lí | Chậm ( ETH 15s/block , BSC .. ) |
        | Không cần server | Khả năng lưu trữ bị giới hạn |
        | Gửi/ nhận tiền tệ dễ dàng | SMC không thể gọi API bên ngoài ( chainlink-Oracle đang có solution ) |
        - Build SMC ( sol - haskell - rust )
            1. Code SMC
            2. Compile code thành EVM bytecode
            3. Gửi transaction contract creation + EVM bytecode lên blockchain
            4. Chờ transaction được đào
            
        - Giao tiếp với SMC
            - Gọi function trong SMC → trong function của `SMC A` có thể gọi function `SMC B`
        
    - GAS
        - QA
            - Phí giao dịch
                - Vì sao phải trả Gas ?
                    - Chống spam
                    - Trả cho miner thợ đào
                - Ai trả phí GAS ?
                    - Là người gửi TX ( người sign tx đó )
                - Trả cho ai ?
                    - Cho người miner ghi block lên block chain
                - Trả bằng gì ?
                    - Trả bằng native token
                - Trả bao nhiêu gas ?
                    - Phụ thuộc độ phức tạp của tx
                    - Example
                        - Tính từ EI từng phép tính →
                        - Tổng của Elementary instruction
        - Gas Detail
            - gas price
            - gas used
            - → khi xử lí tx lượng gas dư sẽ được refund lại
            - Chỉ cần trả  1 lượng max gas ( wallet → tính toán )
    
    - Hỏi pv
        - ABI là gì
            - là 1 signature chứa các hàm , hàm nhận vào và trả ra là kiểu dữ liệu gì
            - ABI được dùng bên 3rd web.js etherjs …